#
# This is a tasks.py file for the pip invoke package: https://docs.pyinvoke.org/.
#
# It's a replacement of our Makefile with same tasks.
#
# Usage:
#   invoke --list
#

import sys;
import os;
import inspect;
import shutil;
from invoke import task;


MEDIASOUP_BUILDTYPE = os.getenv('MEDIASOUP_BUILDTYPE') or 'Release';
WORKER_DIR = os.path.dirname(os.path.abspath(
    inspect.getframeinfo(inspect.currentframe()).filename
));
# NOTE: MEDIASOUP_OUT_DIR is overrided by build.rs.
MEDIASOUP_OUT_DIR = os.getenv('MEDIASOUP_OUT_DIR') or f'{WORKER_DIR}/out';
MEDIASOUP_INSTALL_DIR = os.getenv('MEDIASOUP_INSTALL_DIR') or f'{MEDIASOUP_OUT_DIR}/{MEDIASOUP_BUILDTYPE}';
BUILD_DIR = os.getenv('BUILD_DIR') or f'{MEDIASOUP_INSTALL_DIR}/build';
PIP_DIR = f'{MEDIASOUP_OUT_DIR}/pip';
# If available (only on some *nix systems), os.sched_getaffinity(0) gets set of
# CPUs the calling thread is restricted to. Instead, os.cpu_count() returns the
# total number of CPUs in a system (it doesn't take into account how many of them
# the calling thread can use).
NUM_CORES = len(os.sched_getaffinity(0)) if hasattr(os, 'sched_getaffinity') else os.cpu_count();
PYTHON = os.getenv('PYTHON') or sys.executable;
MESON = os.getenv('MESON') or f'{PIP_DIR}/bin/meson';
MESON_VERSION = os.getenv('MESON_VERSION') or '1.2.1';
# MESON_ARGS can be used to provide extra configuration parameters to meson,
# such as adding defines or changing optimization options. For instance, use
# `MESON_ARGS="-Dms_log_trace=true -Dms_log_file_line=true" npm i` to compile
# worker with tracing and enabled.
# NOTE: On Windows make sure to add `--vsenv` or have MSVS environment already
# active if you override this parameter.
MESON_ARGS = '';
if os.name == 'nt' and not os.getenv('MESON_ARGS'):
    MESON_ARGS = '--vsenv';
# Let's use a specific version of ninja to avoid buggy version 1.11.1:
# https://mediasoup.discourse.group/t/partly-solved-could-not-detect-ninja-v1-8-2-or-newer/
# https://github.com/ninja-build/ninja/issues/2211
# https://github.com/ninja-build/ninja/issues/2212
NINJA_VERSION = os.getenv('NINJA_VERSION') or '1.10.2.4';
NPM = os.getenv('NPM') or 'npm';
LCOV = os.getenv('LCOV') or f'{WORKER_DIR}/deps/lcov/bin/lcov';
DOCKER = os.getenv('DOCKER') or 'docker';

# Disable `*.pyc` files creation.
os.environ['PYTHONDONTWRITEBYTECODE'] = 'true';

# Instruct meson where to look for ninja binary.
if os.name == 'nt':
    # Windows is, of course, special.
    os.environ['NINJA'] = f'{PIP_DIR}/bin/ninja.exe';
else:
    os.environ['NINJA'] = f'{PIP_DIR}/bin/ninja';

# Instruct Python where to look for modules it needs, such that meson actually
# runs from installed location.
# NOTE: For some reason on Windows adding `:{PYTHONPATH}` breaks things.
if os.name == 'nt':
    os.environ['PYTHONPATH'] = PIP_DIR;
else:
    PYTHONPATH = os.getenv('PYTHONPATH') or '';
    os.environ['PYTHONPATH'] = f'{PIP_DIR}:{PYTHONPATH}';


# Utils.

def get_num_cpus():
    # If available (only on some *nix systems), os.sched_getaffinity(0) gets
    # accurate set of CPUs the calling thread is restricted to.
    #
    if hasattr(os, 'sched_getaffinity'):
        return len(os.sched_getaffinity(0));
    # Instead, os.cpu_count() returns the count of the total CPUs in a system
    # (it doesn't take into account how many of them the calling thread can use).
    else:
        return os.cpu_info();


# Tasks.

@task
def meson_ninja(ctx):
    """
    Install meson and ninja (also update Python pip and setuptools packages)
    """
    if os.path.isdir(PIP_DIR):
        return;

    # Updated pip and setuptools are needed for meson.
    # `--system` is not present everywhere and is only needed as workaround for
    # Debian-specific issue (copied from https://github.com/gluster/gstatus/pull/33),
    # fallback to command without `--system` if the first one fails.
    try:
        ctx.run(
            f'{PYTHON} -m pip install --system --target={PIP_DIR} pip setuptools',
            echo=True,
            hide=True
        );
    except:
        ctx.run(
            f'{PYTHON} -m pip install --target={PIP_DIR} pip setuptools',
            echo=True,
            pty=True
        );

    # Workaround for NixOS and Guix that don't work with pre-built binaries, see:
    # https://github.com/NixOS/nixpkgs/issues/142383.
    PIP_BUILD_BINARIES = '';

    if os.path.isfile('/etc/NIXOS') or os.path.isdir('/etc/guix'):
        PIP_BUILD_BINARIES = '--no-binary :all:';

    # Install meson and ninja using pip into our custom location, so we don't
    # depend on system-wide installation.
    ctx.run(
        f'{PYTHON} -m pip install --upgrade --target={PIP_DIR} {PIP_BUILD_BINARIES} meson=={MESON_VERSION} ninja=={NINJA_VERSION}',
        echo=True,
        pty=True
    );


@task(pre=[meson_ninja])
def setup(ctx):
    """
    Run meson setup
    """
    # We try to call `--reconfigure` first as a workaround for this issue:
    # https://github.com/ninja-build/ninja/issues/1997
    if MEDIASOUP_BUILDTYPE == 'Release':
        try:
            with ctx.cd(WORKER_DIR):
                ctx.run(
                    f'{MESON} setup --prefix {MEDIASOUP_INSTALL_DIR} --bindir "" --libdir "" --buildtype release -Db_ndebug=true -Db_pie=true -Db_staticpic=true --reconfigure {MESON_ARGS} {BUILD_DIR}',
                    echo=True,
                    pty=True
                );
        except:
            with ctx.cd(WORKER_DIR):
                ctx.run(
                    f'{MESON} setup --prefix {MEDIASOUP_INSTALL_DIR} --bindir "" --libdir "" --buildtype release -Db_ndebug=true -Db_pie=true -Db_staticpic=true {MESON_ARGS} {BUILD_DIR}',
                    echo=True,
                    pty=True
                );
    elif MEDIASOUP_BUILDTYPE == 'Debug':
        try:
            with ctx.cd(WORKER_DIR):
                ctx.run(
                    f'{MESON} setup --prefix {MEDIASOUP_INSTALL_DIR} --bindir "" --libdir "" --buildtype debug -Db_pie=true -Db_staticpic=true --reconfigure {MESON_ARGS} {BUILD_DIR}',
                    echo=True,
                    pty=True
                );
        except:
            with ctx.cd(WORKER_DIR):
                ctx.run(
                    f'{MESON} setup --prefix {MEDIASOUP_INSTALL_DIR} --bindir "" --libdir "" --buildtype debug -Db_pie=true -Db_staticpic=true {MESON_ARGS} {BUILD_DIR}',
                    echo=True,
                    pty=True
                );
    else:
        try:
            with ctx.cd(WORKER_DIR):
                ctx.run(
                    f'{MESON} setup --prefix {MEDIASOUP_INSTALL_DIR} --bindir "" --libdir "" --buildtype {MEDIASOUP_BUILDTYPE} -Db_ndebug=if-release -Db_pie=true -Db_staticpic=true --reconfigure {MESON_ARGS} {BUILD_DIR}',
                    echo=True,
                    pty=True
                );
        except:
            with ctx.cd(WORKER_DIR):
                ctx.run(
                    f'{MESON} setup --prefix {MEDIASOUP_INSTALL_DIR} --bindir "" --libdir "" --buildtype {MEDIASOUP_BUILDTYPE} -Db_ndebug=if-release -Db_pie=true -Db_staticpic=true {MESON_ARGS} {BUILD_DIR}',
                    echo=True,
                    pty=True
                );


@task
def clean(ctx):
    """
    Clean the installation directory
    """
    try:
        shutil.rmtree(MEDIASOUP_INSTALL_DIR);
    except:
        pass;


@task
def clean_build(ctx):
    """
    Clean the build directory
    """
    try:
        shutil.rmtree(BUILD_DIR);
    except:
        pass;


@task
def clean_pip(ctx):
    """
    Clean the local pip directory
    """
    try:
        shutil.rmtree(PIP_DIR);
    except:
        pass;


@task(pre=[meson_ninja])
def clean_subprojects(ctx):
    """
    Clean meson subprojects
    """
    with ctx.cd(WORKER_DIR):
        ctx.run(
            f'{MESON} subprojects purge --include-cache --confirm',
            echo=True,
            pty=True
        );


@task
def clean_all(ctx):
    """
    Clean meson subprojects and all installed/built artificats
    """
    with ctx.cd(WORKER_DIR):
        try:
            ctx.run(
                f'{MESON} subprojects purge --include-cache --confirm',
                echo=True,
                pty=True
            );
        except:
            pass;

        try:
            shutil.rmtree(MEDIASOUP_OUT_DIR);
        except:
            pass;


@task(pre=[meson_ninja])
def update_wrap_file(ctx, subproject):
    """
    Update the wrap file of a subproject
    """
    with ctx.cd(WORKER_DIR):
        ctx.run(
            f'{MESON} subprojects update --reset {subproject}',
            echo=True,
            pty=True
        );


@task(pre=[setup])
def flatc(ctx):
    """
    Compile FlatBuffers FBS files
    """
    with ctx.cd(WORKER_DIR):
        ctx.run(
            f'{MESON} compile -C {BUILD_DIR} flatbuffers-generator',
            echo=True,
            pty=True
        );


@task(pre=[setup, flatc], default=True)
def mediasoup_worker(ctx):
    """
    Compile mediasoup-worker binary
    """
    if os.getenv('MEDIASOUP_WORKER_BIN'):
        printf('skipping mediasoup-worker compilation due to the existence of the MEDIASOUP_WORKER_BIN environment variable');
        return;

    with ctx.cd(WORKER_DIR):
        ctx.run(
            f'{MESON} compile -C {BUILD_DIR} -j {NUM_CORES} mediasoup-worker',
            echo=True,
            pty=True
        );
    with ctx.cd(WORKER_DIR):
        ctx.run(
            f'{MESON} install -C {BUILD_DIR} --no-rebuild --tags mediasoup-worker',
            echo=True,
            pty=True
        );


@task(pre=[setup, flatc])
def libmediasoup_worker(ctx):
    """
    Compile libmediasoup-worker library
    """
    with ctx.cd(WORKER_DIR):
        ctx.run(
            f'{MESON} compile -C {BUILD_DIR} -j {NUM_CORES} libmediasoup-worker',
            echo=True,
            pty=True
        );
    with ctx.cd(WORKER_DIR):
        ctx.run(
            f'{MESON} install -C {BUILD_DIR} --no-rebuild --tags libmediasoup-worker',
            echo=True,
            pty=True
        );


@task(pre=[setup, flatc])
def xcode(ctx):
    """
    Setup Xcode project
    """
    with ctx.cd(WORKER_DIR):
        ctx.run(
            f'{MESON} setup --buildtype {MEDIASOUP_BUILDTYPE} --backend xcode {MEDIASOUP_OUT_DIR}/xcode',
            echo=True,
            pty=True
        );


@task
def lint(ctx):
    """
    Lint source code
    """
    with ctx.cd(WORKER_DIR):
        ctx.run(
            f'{NPM} run lint --prefix scripts/',
            echo=True,
            pty=True
        );


@task
def format(ctx):
    """
    Format source code according to lint rules
    """
    with ctx.cd(WORKER_DIR):
        ctx.run(
            f'{NPM} run format --prefix scripts/',
            echo=True,
            pty=True
        );


@task(pre=[setup, flatc])
def test(ctx):
    """
    Run worker tests
    """
    with ctx.cd(WORKER_DIR):
        ctx.run(
            f'{MESON} compile -C {BUILD_DIR} -j {NUM_CORES} mediasoup-worker-test',
            echo=True,
            pty=True
        );
    with ctx.cd(WORKER_DIR):
        ctx.run(
            f'{MESON} install -C {BUILD_DIR} --no-rebuild --tags mediasoup-worker-test',
            echo=True,
            pty=True
        );

    MEDIASOUP_TEST_TAGS = os.getenv('MEDIASOUP_TEST_TAGS') or '';

    # On Windows lcov doesn't work (at least not yet) and we need to add .exe to
    # the binary path.
    if os.name == 'nt':
        with ctx.cd(WORKER_DIR):
            ctx.run(
                f'{BUILD_DIR}/mediasoup-worker-test.exe --invisibles --use-colour=yes {MEDIASOUP_TEST_TAGS}',
                echo=True,
                pty=True
            );
    else:
        ctx.run(
            f'{LCOV} --directory {WORKER_DIR} --zerocounters',
            echo=True,
            pty=True
        );
        with ctx.cd(WORKER_DIR):
            ctx.run(
                f'{BUILD_DIR}/mediasoup-worker-test --invisibles --use-colour=yes {MEDIASOUP_TEST_TAGS}',
                echo=True,
                pty=True
            );


@task(pre=[setup, flatc])
def test_asan(ctx):
    """
    Run worker test with Address Sanitizer
    """
    with ctx.cd(WORKER_DIR):
        ctx.run(
            f'{MESON} compile -C {BUILD_DIR} -j {NUM_CORES} mediasoup-worker-test-asan',
            echo=True,
            pty=True
        );
    with ctx.cd(WORKER_DIR):
        ctx.run(
            f'{MESON} install -C {BUILD_DIR} --no-rebuild --tags mediasoup-worker-test-asan',
            echo=True,
            pty=True
        );

    MEDIASOUP_TEST_TAGS = os.getenv('MEDIASOUP_TEST_TAGS') or '';

    with ctx.cd(WORKER_DIR):
        ctx.run(
            f'ASAN_OPTIONS=detect_leaks=1 {BUILD_DIR}/mediasoup-worker-test-asan --invisibles --use-colour=yes {MEDIASOUP_TEST_TAGS}',
            echo=True,
            pty=True
        );


@task
def tidy(ctx):
    """
    Perform C++ checks with clang-tidy
    """
    MEDIASOUP_TIDY_CHECKS = os.getenv('MEDIASOUP_TIDY_CHECKS') or '';

    with ctx.cd(WORKER_DIR):
        ctx.run(
            f'{PYTHON} ./scripts/clang-tidy.py -clang-tidy-binary=./scripts/node_modules/.bin/clang-tidy -clang-apply-replacements-binary=./scripts/node_modules/.bin/clang-apply-replacements -header-filter="(Channel/**/*.hpp|DepLibSRTP.hpp|DepLibUV.hpp|DepLibWebRTC.hpp|DepOpenSSL.hpp|DepUsrSCTP.hpp|LogLevel.hpp|Logger.hpp|MediaSoupError.hpp|RTC/**/*.hpp|Settings.hpp|Utils.hpp|Worker.hpp|common.hpp|handles/**/*.hpp)" -p={BUILD_DIR} -j={NUM_CORES} -checks={MEDIASOUP_TIDY_CHECKS} -quiet',
            echo=True,
            pty=True
        );


@task(pre=[setup, flatc])
def fuzzer(ctx):
    """
    Build the mediasoup-worker-fuzzer binary (which uses libFuzzer)
    """
    with ctx.cd(WORKER_DIR):
        ctx.run(
            f'{MESON} compile -C {BUILD_DIR} -j {NUM_CORES} mediasoup-worker-fuzzer',
            echo=True,
            pty=True
        );
    with ctx.cd(WORKER_DIR):
        ctx.run(
            f'{MESON} install -C {BUILD_DIR} --no-rebuild --tags mediasoup-worker-fuzzer',
            echo=True,
            pty=True
        );


@task
def fuzzer(ctx):
    """
    Run all fuzzer cases
    """
    with ctx.cd(WORKER_DIR):
        ctx.run(
            f'LSAN_OPTIONS=verbosity=1:log_threads=1 {BUILD_DIR}/mediasoup-worker-fuzzer -artifact_prefix=fuzzer/reports/ -max_len=1400 fuzzer/new-corpus deps/webrtc-fuzzer-corpora/corpora/stun-corpus deps/webrtc-fuzzer-corpora/corpora/rtp-corpus deps/webrtc-fuzzer-corpora/corpora/rtcp-corpus',
            echo=True,
            pty=True
        );


@task
def docker(ctx):
    """
    Build a Linux Ubuntu Docker image with fuzzer capable clang++
    """
    if os.getenv('DOCKER_NO_CACHE') == 'true':
        with ctx.cd(WORKER_DIR):
            ctx.run(
                f'{DOCKER} build -f Dockerfile --no-cache --tag mediasoup/docker:latest .',
                echo=True,
                pty=True
            );
    else:
        with ctx.cd(WORKER_DIR):
            ctx.run(
                f'{DOCKER} build -f Dockerfile --tag mediasoup/docker:latest .',
                echo=True,
                pty=True
            );


@task
def docker_run(ctx):
    """
    Run a container of the Ubuntu Docker image created in the docker task
    """
    with ctx.cd(WORKER_DIR):
        ctx.run(
            f'{DOCKER} run --name=mediasoupDocker -it --rm --privileged --cap-add SYS_PTRACE -v {WORKER_DIR}/../:/mediasoup mediasoup/docker:latest',
            echo=True,
            pty=True # NOTE: Needed to enter the terminal of the Docker image.
        );


@task
def docker_alpine(ctx):
    """
    Build a Linux Alpine Docker image
    """
    if os.getenv('DOCKER_NO_CACHE') == 'true':
        with ctx.cd(WORKER_DIR):
            ctx.run(
                f'{DOCKER} build -f Dockerfile.alpine --no-cache --tag mediasoup/docker-alpine:latest .',
                echo=True,
                pty=True
            );
    else:
        with ctx.cd(WORKER_DIR):
            ctx.run(
                f'{DOCKER} build -f Dockerfile.alpine --tag mediasoup/docker-alpine:latest .',
                echo=True,
                pty=True
            );


@task
def docker_alpine_run(ctx):
    """
    Run a container of the Alpine Docker image created in the docker_alpine task
    """
    with ctx.cd(WORKER_DIR):
        ctx.run(
            f'{DOCKER} run --name=mediasoupDockerAlpine -it --rm --privileged --cap-add SYS_PTRACE -v {WORKER_DIR}/../:/mediasoup mediasoup/docker-alpine:latest',
            echo=True,
            pty=True # NOTE: Needed to enter the terminal of the Docker image.
        );
