// automatically generated by the FlatBuffers compiler, do not modify

import * as flatbuffers from 'flatbuffers';

import { Parameter, ParameterT } from '../../f-b-s/rtp-parameters/parameter';
import { RtcpFeedback, RtcpFeedbackT } from '../../f-b-s/rtp-parameters/rtcp-feedback';


export class RtpCodecParameters {
  bb: flatbuffers.ByteBuffer|null = null;
  bb_pos = 0;
__init(i:number, bb:flatbuffers.ByteBuffer):RtpCodecParameters {
  this.bb_pos = i;
  this.bb = bb;
  return this;
}

static getRootAsRtpCodecParameters(bb:flatbuffers.ByteBuffer, obj?:RtpCodecParameters):RtpCodecParameters {
  return (obj || new RtpCodecParameters()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

static getSizePrefixedRootAsRtpCodecParameters(bb:flatbuffers.ByteBuffer, obj?:RtpCodecParameters):RtpCodecParameters {
  bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
  return (obj || new RtpCodecParameters()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

mimeType():string|null
mimeType(optionalEncoding:flatbuffers.Encoding):string|Uint8Array|null
mimeType(optionalEncoding?:any):string|Uint8Array|null {
  const offset = this.bb!.__offset(this.bb_pos, 4);
  return offset ? this.bb!.__string(this.bb_pos + offset, optionalEncoding) : null;
}

payloadType():number {
  const offset = this.bb!.__offset(this.bb_pos, 6);
  return offset ? this.bb!.readUint8(this.bb_pos + offset) : 0;
}

clockRate():number {
  const offset = this.bb!.__offset(this.bb_pos, 8);
  return offset ? this.bb!.readUint32(this.bb_pos + offset) : 0;
}

channels():number {
  const offset = this.bb!.__offset(this.bb_pos, 10);
  return offset ? this.bb!.readUint8(this.bb_pos + offset) : 0;
}

parameters(index: number, obj?:Parameter):Parameter|null {
  const offset = this.bb!.__offset(this.bb_pos, 12);
  return offset ? (obj || new Parameter()).__init(this.bb!.__indirect(this.bb!.__vector(this.bb_pos + offset) + index * 4), this.bb!) : null;
}

parametersLength():number {
  const offset = this.bb!.__offset(this.bb_pos, 12);
  return offset ? this.bb!.__vector_len(this.bb_pos + offset) : 0;
}

rtcpFeedback(index: number, obj?:RtcpFeedback):RtcpFeedback|null {
  const offset = this.bb!.__offset(this.bb_pos, 14);
  return offset ? (obj || new RtcpFeedback()).__init(this.bb!.__indirect(this.bb!.__vector(this.bb_pos + offset) + index * 4), this.bb!) : null;
}

rtcpFeedbackLength():number {
  const offset = this.bb!.__offset(this.bb_pos, 14);
  return offset ? this.bb!.__vector_len(this.bb_pos + offset) : 0;
}

static startRtpCodecParameters(builder:flatbuffers.Builder) {
  builder.startObject(6);
}

static addMimeType(builder:flatbuffers.Builder, mimeTypeOffset:flatbuffers.Offset) {
  builder.addFieldOffset(0, mimeTypeOffset, 0);
}

static addPayloadType(builder:flatbuffers.Builder, payloadType:number) {
  builder.addFieldInt8(1, payloadType, 0);
}

static addClockRate(builder:flatbuffers.Builder, clockRate:number) {
  builder.addFieldInt32(2, clockRate, 0);
}

static addChannels(builder:flatbuffers.Builder, channels:number) {
  builder.addFieldInt8(3, channels, 0);
}

static addParameters(builder:flatbuffers.Builder, parametersOffset:flatbuffers.Offset) {
  builder.addFieldOffset(4, parametersOffset, 0);
}

static createParametersVector(builder:flatbuffers.Builder, data:flatbuffers.Offset[]):flatbuffers.Offset {
  builder.startVector(4, data.length, 4);
  for (let i = data.length - 1; i >= 0; i--) {
    builder.addOffset(data[i]!);
  }
  return builder.endVector();
}

static startParametersVector(builder:flatbuffers.Builder, numElems:number) {
  builder.startVector(4, numElems, 4);
}

static addRtcpFeedback(builder:flatbuffers.Builder, rtcpFeedbackOffset:flatbuffers.Offset) {
  builder.addFieldOffset(5, rtcpFeedbackOffset, 0);
}

static createRtcpFeedbackVector(builder:flatbuffers.Builder, data:flatbuffers.Offset[]):flatbuffers.Offset {
  builder.startVector(4, data.length, 4);
  for (let i = data.length - 1; i >= 0; i--) {
    builder.addOffset(data[i]!);
  }
  return builder.endVector();
}

static startRtcpFeedbackVector(builder:flatbuffers.Builder, numElems:number) {
  builder.startVector(4, numElems, 4);
}

static endRtpCodecParameters(builder:flatbuffers.Builder):flatbuffers.Offset {
  const offset = builder.endObject();
  builder.requiredField(offset, 4) // mime_type
  return offset;
}

static createRtpCodecParameters(builder:flatbuffers.Builder, mimeTypeOffset:flatbuffers.Offset, payloadType:number, clockRate:number, channels:number, parametersOffset:flatbuffers.Offset, rtcpFeedbackOffset:flatbuffers.Offset):flatbuffers.Offset {
  RtpCodecParameters.startRtpCodecParameters(builder);
  RtpCodecParameters.addMimeType(builder, mimeTypeOffset);
  RtpCodecParameters.addPayloadType(builder, payloadType);
  RtpCodecParameters.addClockRate(builder, clockRate);
  RtpCodecParameters.addChannels(builder, channels);
  RtpCodecParameters.addParameters(builder, parametersOffset);
  RtpCodecParameters.addRtcpFeedback(builder, rtcpFeedbackOffset);
  return RtpCodecParameters.endRtpCodecParameters(builder);
}

unpack(): RtpCodecParametersT {
  return new RtpCodecParametersT(
    this.mimeType(),
    this.payloadType(),
    this.clockRate(),
    this.channels(),
    this.bb!.createObjList(this.parameters.bind(this), this.parametersLength()),
    this.bb!.createObjList(this.rtcpFeedback.bind(this), this.rtcpFeedbackLength())
  );
}


unpackTo(_o: RtpCodecParametersT): void {
  _o.mimeType = this.mimeType();
  _o.payloadType = this.payloadType();
  _o.clockRate = this.clockRate();
  _o.channels = this.channels();
  _o.parameters = this.bb!.createObjList(this.parameters.bind(this), this.parametersLength());
  _o.rtcpFeedback = this.bb!.createObjList(this.rtcpFeedback.bind(this), this.rtcpFeedbackLength());
}
}

export class RtpCodecParametersT {
constructor(
  public mimeType: string|Uint8Array|null = null,
  public payloadType: number = 0,
  public clockRate: number = 0,
  public channels: number = 0,
  public parameters: (ParameterT)[] = [],
  public rtcpFeedback: (RtcpFeedbackT)[] = []
){}


pack(builder:flatbuffers.Builder): flatbuffers.Offset {
  const mimeType = (this.mimeType !== null ? builder.createString(this.mimeType!) : 0);
  const parameters = RtpCodecParameters.createParametersVector(builder, builder.createObjectOffsetList(this.parameters));
  const rtcpFeedback = RtpCodecParameters.createRtcpFeedbackVector(builder, builder.createObjectOffsetList(this.rtcpFeedback));

  return RtpCodecParameters.createRtpCodecParameters(builder,
    mimeType,
    this.payloadType,
    this.clockRate,
    this.channels,
    parameters,
    rtcpFeedback
  );
}
}
