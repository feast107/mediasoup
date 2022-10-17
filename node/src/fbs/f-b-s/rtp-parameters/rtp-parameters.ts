// automatically generated by the FlatBuffers compiler, do not modify

import * as flatbuffers from 'flatbuffers';

import { RtcpParameters, RtcpParametersT } from '../../f-b-s/rtp-parameters/rtcp-parameters';
import { RtpCodecParameters, RtpCodecParametersT } from '../../f-b-s/rtp-parameters/rtp-codec-parameters';
import { RtpEncodingParameters, RtpEncodingParametersT } from '../../f-b-s/rtp-parameters/rtp-encoding-parameters';
import { RtpHeaderExtensionParameters, RtpHeaderExtensionParametersT } from '../../f-b-s/rtp-parameters/rtp-header-extension-parameters';


export class RtpParameters {
  bb: flatbuffers.ByteBuffer|null = null;
  bb_pos = 0;
__init(i:number, bb:flatbuffers.ByteBuffer):RtpParameters {
  this.bb_pos = i;
  this.bb = bb;
  return this;
}

static getRootAsRtpParameters(bb:flatbuffers.ByteBuffer, obj?:RtpParameters):RtpParameters {
  return (obj || new RtpParameters()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

static getSizePrefixedRootAsRtpParameters(bb:flatbuffers.ByteBuffer, obj?:RtpParameters):RtpParameters {
  bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
  return (obj || new RtpParameters()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

mid():string|null
mid(optionalEncoding:flatbuffers.Encoding):string|Uint8Array|null
mid(optionalEncoding?:any):string|Uint8Array|null {
  const offset = this.bb!.__offset(this.bb_pos, 4);
  return offset ? this.bb!.__string(this.bb_pos + offset, optionalEncoding) : null;
}

codecs(index: number, obj?:RtpCodecParameters):RtpCodecParameters|null {
  const offset = this.bb!.__offset(this.bb_pos, 6);
  return offset ? (obj || new RtpCodecParameters()).__init(this.bb!.__indirect(this.bb!.__vector(this.bb_pos + offset) + index * 4), this.bb!) : null;
}

codecsLength():number {
  const offset = this.bb!.__offset(this.bb_pos, 6);
  return offset ? this.bb!.__vector_len(this.bb_pos + offset) : 0;
}

headerExtensions(index: number, obj?:RtpHeaderExtensionParameters):RtpHeaderExtensionParameters|null {
  const offset = this.bb!.__offset(this.bb_pos, 8);
  return offset ? (obj || new RtpHeaderExtensionParameters()).__init(this.bb!.__indirect(this.bb!.__vector(this.bb_pos + offset) + index * 4), this.bb!) : null;
}

headerExtensionsLength():number {
  const offset = this.bb!.__offset(this.bb_pos, 8);
  return offset ? this.bb!.__vector_len(this.bb_pos + offset) : 0;
}

encodings(index: number, obj?:RtpEncodingParameters):RtpEncodingParameters|null {
  const offset = this.bb!.__offset(this.bb_pos, 10);
  return offset ? (obj || new RtpEncodingParameters()).__init(this.bb!.__indirect(this.bb!.__vector(this.bb_pos + offset) + index * 4), this.bb!) : null;
}

encodingsLength():number {
  const offset = this.bb!.__offset(this.bb_pos, 10);
  return offset ? this.bb!.__vector_len(this.bb_pos + offset) : 0;
}

rtcp(obj?:RtcpParameters):RtcpParameters|null {
  const offset = this.bb!.__offset(this.bb_pos, 12);
  return offset ? (obj || new RtcpParameters()).__init(this.bb!.__indirect(this.bb_pos + offset), this.bb!) : null;
}

static startRtpParameters(builder:flatbuffers.Builder) {
  builder.startObject(5);
}

static addMid(builder:flatbuffers.Builder, midOffset:flatbuffers.Offset) {
  builder.addFieldOffset(0, midOffset, 0);
}

static addCodecs(builder:flatbuffers.Builder, codecsOffset:flatbuffers.Offset) {
  builder.addFieldOffset(1, codecsOffset, 0);
}

static createCodecsVector(builder:flatbuffers.Builder, data:flatbuffers.Offset[]):flatbuffers.Offset {
  builder.startVector(4, data.length, 4);
  for (let i = data.length - 1; i >= 0; i--) {
    builder.addOffset(data[i]!);
  }
  return builder.endVector();
}

static startCodecsVector(builder:flatbuffers.Builder, numElems:number) {
  builder.startVector(4, numElems, 4);
}

static addHeaderExtensions(builder:flatbuffers.Builder, headerExtensionsOffset:flatbuffers.Offset) {
  builder.addFieldOffset(2, headerExtensionsOffset, 0);
}

static createHeaderExtensionsVector(builder:flatbuffers.Builder, data:flatbuffers.Offset[]):flatbuffers.Offset {
  builder.startVector(4, data.length, 4);
  for (let i = data.length - 1; i >= 0; i--) {
    builder.addOffset(data[i]!);
  }
  return builder.endVector();
}

static startHeaderExtensionsVector(builder:flatbuffers.Builder, numElems:number) {
  builder.startVector(4, numElems, 4);
}

static addEncodings(builder:flatbuffers.Builder, encodingsOffset:flatbuffers.Offset) {
  builder.addFieldOffset(3, encodingsOffset, 0);
}

static createEncodingsVector(builder:flatbuffers.Builder, data:flatbuffers.Offset[]):flatbuffers.Offset {
  builder.startVector(4, data.length, 4);
  for (let i = data.length - 1; i >= 0; i--) {
    builder.addOffset(data[i]!);
  }
  return builder.endVector();
}

static startEncodingsVector(builder:flatbuffers.Builder, numElems:number) {
  builder.startVector(4, numElems, 4);
}

static addRtcp(builder:flatbuffers.Builder, rtcpOffset:flatbuffers.Offset) {
  builder.addFieldOffset(4, rtcpOffset, 0);
}

static endRtpParameters(builder:flatbuffers.Builder):flatbuffers.Offset {
  const offset = builder.endObject();
  builder.requiredField(offset, 6) // codecs
  return offset;
}

static finishRtpParametersBuffer(builder:flatbuffers.Builder, offset:flatbuffers.Offset) {
  builder.finish(offset);
}

static finishSizePrefixedRtpParametersBuffer(builder:flatbuffers.Builder, offset:flatbuffers.Offset) {
  builder.finish(offset, undefined, true);
}


unpack(): RtpParametersT {
  return new RtpParametersT(
    this.mid(),
    this.bb!.createObjList(this.codecs.bind(this), this.codecsLength()),
    this.bb!.createObjList(this.headerExtensions.bind(this), this.headerExtensionsLength()),
    this.bb!.createObjList(this.encodings.bind(this), this.encodingsLength()),
    (this.rtcp() !== null ? this.rtcp()!.unpack() : null)
  );
}


unpackTo(_o: RtpParametersT): void {
  _o.mid = this.mid();
  _o.codecs = this.bb!.createObjList(this.codecs.bind(this), this.codecsLength());
  _o.headerExtensions = this.bb!.createObjList(this.headerExtensions.bind(this), this.headerExtensionsLength());
  _o.encodings = this.bb!.createObjList(this.encodings.bind(this), this.encodingsLength());
  _o.rtcp = (this.rtcp() !== null ? this.rtcp()!.unpack() : null);
}
}

export class RtpParametersT {
constructor(
  public mid: string|Uint8Array|null = null,
  public codecs: (RtpCodecParametersT)[] = [],
  public headerExtensions: (RtpHeaderExtensionParametersT)[] = [],
  public encodings: (RtpEncodingParametersT)[] = [],
  public rtcp: RtcpParametersT|null = null
){}


pack(builder:flatbuffers.Builder): flatbuffers.Offset {
  const mid = (this.mid !== null ? builder.createString(this.mid!) : 0);
  const codecs = RtpParameters.createCodecsVector(builder, builder.createObjectOffsetList(this.codecs));
  const headerExtensions = RtpParameters.createHeaderExtensionsVector(builder, builder.createObjectOffsetList(this.headerExtensions));
  const encodings = RtpParameters.createEncodingsVector(builder, builder.createObjectOffsetList(this.encodings));
  const rtcp = (this.rtcp !== null ? this.rtcp!.pack(builder) : 0);

  RtpParameters.startRtpParameters(builder);
  RtpParameters.addMid(builder, mid);
  RtpParameters.addCodecs(builder, codecs);
  RtpParameters.addHeaderExtensions(builder, headerExtensions);
  RtpParameters.addEncodings(builder, encodings);
  RtpParameters.addRtcp(builder, rtcp);

  return RtpParameters.endRtpParameters(builder);
}
}
