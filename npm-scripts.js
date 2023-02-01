/* eslint-disable no-console */

const process = require('process');
const os = require('os');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { version } = require('./package.json');

const isFreeBSD = os.platform() === 'freebsd';
const isWindows = os.platform() === 'win32';
const task = process.argv.slice(2).join(' ');

// mediasoup mayor version.
const MAYOR_VERSION = version.split('.')[0];

// make command to use.
const MAKE = process.env.MAKE || (isFreeBSD ? 'gmake' : 'make');

// flatbuffers version.
const FLATBUFFERS_VERSION='22.11.23';

console.log(`npm-scripts.js [INFO] running task "${task}"`);

switch (task)
{
	// As per NPM documentation (https://docs.npmjs.com/cli/v9/using-npm/scripts)
	// `prepare` script:
	//
	// - Runs BEFORE the package is packed, i.e. during `npm publish` and `npm pack`.
	// - Runs on local `npm install` without any arguments.
	// - NOTE: If a package being installed through git contains a `prepare` script,
	//   its dependencies and devDependencies will be installed, and the `prepare`
	//   script will be run, before the package is packaged and installed.
	//
	// So here we generate flatbuffers definitions for TypeScript and compile
	// TypeScript to JavaScript.
	case 'prepare':
	{
		flatcNode();
		buildTypescript(/* force */ false);

		break;
	}

	case 'postinstall':
	{
		if (!process.env.MEDIASOUP_WORKER_BIN)
		{
			buildWorker();

			if (!process.env.MEDIASOUP_LOCAL_DEV)
			{
				cleanWorker();
			}
		}

		break;
	}

	case 'typescript:build':
	{
		installNodeDeps();
		buildTypescript(/* force */ true);
		replaceVersion();

		break;
	}

	case 'typescript:watch':
	{
		deleteNodeLib();

		const { TscWatchClient } = require('tsc-watch/client');
		const watch = new TscWatchClient();

		watch.on('success', replaceVersion);
		watch.start('--project', 'node', '--pretty');

		break;
	}

	case 'worker:build':
	{
		buildWorker();

		break;
	}

	case 'lint:node':
	{
		lintNode();

		break;
	}

	case 'lint:worker':
	{
		lintWorker();

		break;
	}

	case 'format:worker':
	{
		executeCmd(`${MAKE} format -C worker`);

		break;
	}

	case 'flatc:node':
	{
		flatcNode();

		break;
	}

	case 'flatc:worker':
	{
		flatcWorker();

		break;
	}

	case 'test:node':
	{
		buildTypescript(/* force */ false);
		replaceVersion();
		testNode();

		break;
	}

	case 'test:worker':
	{
		testWorker();

		break;
	}

	case 'coverage:node':
	{
		buildTypescript(/* force */ false);
		replaceVersion();
		executeCmd('jest --coverage');
		executeCmd('open-cli coverage/lcov-report/index.html');

		break;
	}

	case 'install-deps:node':
	{
		installNodeDeps();

		break;
	}

	case 'install-clang-tools':
	{
		executeCmd('npm ci --prefix worker/scripts');

		break;
	}

	case 'release:check':
	{
		checkRelease();

		break;
	}

	case 'release':
	{
		checkRelease();
		executeCmd(`git commit -am '${version}'`);
		executeCmd(`git tag -a ${version} -m '${version}'`);
		executeCmd(`git push origin v${MAYOR_VERSION}`);
		executeCmd(`git push origin '${version}'`);
		executeCmd('npm publish');

		break;
	}

	default:
	{
		throw new TypeError(`unknown task "${task}"`);
	}
}

function replaceVersion()
{
	console.log('npm-scripts.js [INFO] replaceVersion()');

	const files =
	[
		'node/lib/index.js',
		'node/lib/index.d.ts',
		'node/lib/Worker.js'
	];

	for (const file of files)
	{
		const text = fs.readFileSync(file, { encoding: 'utf8' });
		const result = text.replace(/__MEDIASOUP_VERSION__/g, version);

		fs.writeFileSync(file, result, { encoding: 'utf8' });
	}
}

function deleteNodeLib()
{
	if (!fs.existsSync('node/lib'))
	{
		return;
	}

	console.log('npm-scripts.js [INFO] deleteNodeLib()');

	if (!isWindows)
	{
		executeCmd('rm -rf node/lib');
	}
	else
	{
		// NOTE: This command fails in Windows if the dir doesn't exist.
		executeCmd('rmdir /s /q "node/lib"', /* exitOnError */ false);
	}
}

function buildTypescript(force = false)
{
	if (!force && fs.existsSync('node/lib'))
	{
		return;
	}

	console.log('npm-scripts.js [INFO] buildTypescript()');

	// Clean lib folder.
	deleteNodeLib();

	executeCmd('tsc --project node');
}

function buildWorker()
{
	console.log('npm-scripts.js [INFO] buildWorker()');

	executeCmd(`${MAKE} -C worker`);
}

// TMP: Do not clean subproject while troubleshooting flatbuffers on Windows.
function cleanWorker()
{
	console.log('npm-scripts.js [INFO] cleanWorker()');

	// Clean build artifacts except `mediasoup-worker`.
	executeCmd(`${MAKE} clean-build -C worker`);
	// Clean downloaded dependencies.
	executeCmd(`${MAKE} clean-subprojects -C worker`);
	// Clean PIP/Meson/Ninja.
	executeCmd(`${MAKE} clean-pip -C worker`);
}

function lintNode()
{
	console.log('npm-scripts.js [INFO] lintNode()');

	executeCmd('eslint --ignore-path node/.eslintignore -c node/.eslintrc.js --max-warnings 0 node/src node/.eslintrc.js npm-scripts.js node/src/tests worker/scripts/gulpfile.js');
}

function lintWorker()
{
	console.log('npm-scripts.js [INFO] lintWorker()');

	executeCmd(`${MAKE} lint -C worker`);
}

function flatcNode()
{
	console.log('npm-scripts.js [INFO] flatcNode()');

	// Build flatc if needed.
	executeCmd(`${MAKE} -C worker flatc-all`);

	const extension = isWindows ? '.exe' : '';
	const flatc = path.resolve(path.join(
		'worker', 'out', 'Release', 'build', 'subprojects', `flatbuffers-${FLATBUFFERS_VERSION}`, `flatc${extension}`));
	const src = path.resolve(path.join('worker', 'fbs', '*'));
	const out = path.resolve(path.join('node', 'src', 'fbs'));
	const options = '--gen-object-api';
	const command = `${flatc} --ts ${options} -o ${out} `;

	if (isWindows)
	{
		executeCmd(`for %f in (${src}) do ${command} %f`);
	}
	else
	{
		executeCmd(`for file in ${src}; do ${command} \$\{file\}; done`);
	}

	cleanWorker();
}

function flatcWorker()
{
	console.log('npm-scripts.js [INFO] flatcWorker()');

	executeCmd(`${MAKE} -C worker flatc`);
}

function testNode()
{
	console.log('npm-scripts.js [INFO] testNode()');

	if (!process.env.TEST_FILE)
	{
		executeCmd('jest');
	}
	else
	{
		executeCmd(`jest --testPathPattern ${process.env.TEST_FILE}`);
	}
}

function testWorker()
{
	console.log('npm-scripts.js [INFO] testWorker()');

	executeCmd(`${MAKE} test -C worker`);
}

function installNodeDeps()
{
	console.log('npm-scripts.js [INFO] installNodeDeps()');

	// Install/update Node deps.
	executeCmd('npm ci --ignore-scripts');
	// Update package-lock.json.
	executeCmd('npm install --package-lock-only --ignore-scripts');
}

function checkRelease()
{
	console.log('npm-scripts.js [INFO] checkRelease()');

	installNodeDeps();
	flatcNode();
	buildTypescript(/* force */ true);
	replaceVersion();
	buildWorker();
	lintNode();
	lintWorker();
	testNode();
	testWorker();
}

function executeCmd(command, exitOnError = true)
{
	console.log(`npm-scripts.js [INFO] executeCmd(): ${command}`);

	try
	{
		execSync(command, { stdio: [ 'ignore', process.stdout, process.stderr ] });
	}
	catch (error)
	{
		if (exitOnError)
		{
			console.error(`npm-scripts.js [ERROR] executeCmd() failed, exiting: ${error}`);

			process.exit(1);
		}
		else
		{
			console.log(`npm-scripts.js [INFO] executeCmd() failed, ignoring: ${error}`);
		}
	}
}
