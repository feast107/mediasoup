// automatically generated by the FlatBuffers compiler, do not modify

import * as flatbuffers from 'flatbuffers';

import { ConsumerLayers, ConsumerLayersT } from '../../f-b-s/consumer/consumer-layers';
import { MediaKind } from '../../f-b-s/rtp-parameters/media-kind';
import { RtpEncodingParameters, RtpEncodingParametersT } from '../../f-b-s/rtp-parameters/rtp-encoding-parameters';
import { RtpParameters, RtpParametersT } from '../../f-b-s/rtp-parameters/rtp-parameters';
import { Type } from '../../f-b-s/rtp-parameters/type';


export class ConsumeRequest {
  bb: flatbuffers.ByteBuffer|null = null;
  bb_pos = 0;
__init(i:number, bb:flatbuffers.ByteBuffer):ConsumeRequest {
  this.bb_pos = i;
  this.bb = bb;
  return this;
}

static getRootAsConsumeRequest(bb:flatbuffers.ByteBuffer, obj?:ConsumeRequest):ConsumeRequest {
  return (obj || new ConsumeRequest()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

static getSizePrefixedRootAsConsumeRequest(bb:flatbuffers.ByteBuffer, obj?:ConsumeRequest):ConsumeRequest {
  bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
  return (obj || new ConsumeRequest()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

consumerId():string|null
consumerId(optionalEncoding:flatbuffers.Encoding):string|Uint8Array|null
consumerId(optionalEncoding?:any):string|Uint8Array|null {
  const offset = this.bb!.__offset(this.bb_pos, 4);
  return offset ? this.bb!.__string(this.bb_pos + offset, optionalEncoding) : null;
}

producerId():string|null
producerId(optionalEncoding:flatbuffers.Encoding):string|Uint8Array|null
producerId(optionalEncoding?:any):string|Uint8Array|null {
  const offset = this.bb!.__offset(this.bb_pos, 6);
  return offset ? this.bb!.__string(this.bb_pos + offset, optionalEncoding) : null;
}

kind():MediaKind {
  const offset = this.bb!.__offset(this.bb_pos, 8);
  return offset ? this.bb!.readUint8(this.bb_pos + offset) : MediaKind.ALL;
}

rtpParameters(obj?:RtpParameters):RtpParameters|null {
  const offset = this.bb!.__offset(this.bb_pos, 10);
  return offset ? (obj || new RtpParameters()).__init(this.bb!.__indirect(this.bb_pos + offset), this.bb!) : null;
}

type():Type {
  const offset = this.bb!.__offset(this.bb_pos, 12);
  return offset ? this.bb!.readUint8(this.bb_pos + offset) : Type.NONE;
}

consumableRtpEncodings(index: number, obj?:RtpEncodingParameters):RtpEncodingParameters|null {
  const offset = this.bb!.__offset(this.bb_pos, 14);
  return offset ? (obj || new RtpEncodingParameters()).__init(this.bb!.__indirect(this.bb!.__vector(this.bb_pos + offset) + index * 4), this.bb!) : null;
}

consumableRtpEncodingsLength():number {
  const offset = this.bb!.__offset(this.bb_pos, 14);
  return offset ? this.bb!.__vector_len(this.bb_pos + offset) : 0;
}

paused():boolean {
  const offset = this.bb!.__offset(this.bb_pos, 16);
  return offset ? !!this.bb!.readInt8(this.bb_pos + offset) : false;
}

preferredLayers(obj?:ConsumerLayers):ConsumerLayers|null {
  const offset = this.bb!.__offset(this.bb_pos, 18);
  return offset ? (obj || new ConsumerLayers()).__init(this.bb!.__indirect(this.bb_pos + offset), this.bb!) : null;
}

ignoreDtx():boolean {
  const offset = this.bb!.__offset(this.bb_pos, 20);
  return offset ? !!this.bb!.readInt8(this.bb_pos + offset) : false;
}

static startConsumeRequest(builder:flatbuffers.Builder) {
  builder.startObject(9);
}

static addConsumerId(builder:flatbuffers.Builder, consumerIdOffset:flatbuffers.Offset) {
  builder.addFieldOffset(0, consumerIdOffset, 0);
}

static addProducerId(builder:flatbuffers.Builder, producerIdOffset:flatbuffers.Offset) {
  builder.addFieldOffset(1, producerIdOffset, 0);
}

static addKind(builder:flatbuffers.Builder, kind:MediaKind) {
  builder.addFieldInt8(2, kind, MediaKind.ALL);
}

static addRtpParameters(builder:flatbuffers.Builder, rtpParametersOffset:flatbuffers.Offset) {
  builder.addFieldOffset(3, rtpParametersOffset, 0);
}

static addType(builder:flatbuffers.Builder, type:Type) {
  builder.addFieldInt8(4, type, Type.NONE);
}

static addConsumableRtpEncodings(builder:flatbuffers.Builder, consumableRtpEncodingsOffset:flatbuffers.Offset) {
  builder.addFieldOffset(5, consumableRtpEncodingsOffset, 0);
}

static createConsumableRtpEncodingsVector(builder:flatbuffers.Builder, data:flatbuffers.Offset[]):flatbuffers.Offset {
  builder.startVector(4, data.length, 4);
  for (let i = data.length - 1; i >= 0; i--) {
    builder.addOffset(data[i]!);
  }
  return builder.endVector();
}

static startConsumableRtpEncodingsVector(builder:flatbuffers.Builder, numElems:number) {
  builder.startVector(4, numElems, 4);
}

static addPaused(builder:flatbuffers.Builder, paused:boolean) {
  builder.addFieldInt8(6, +paused, +false);
}

static addPreferredLayers(builder:flatbuffers.Builder, preferredLayersOffset:flatbuffers.Offset) {
  builder.addFieldOffset(7, preferredLayersOffset, 0);
}

static addIgnoreDtx(builder:flatbuffers.Builder, ignoreDtx:boolean) {
  builder.addFieldInt8(8, +ignoreDtx, +false);
}

static endConsumeRequest(builder:flatbuffers.Builder):flatbuffers.Offset {
  const offset = builder.endObject();
  builder.requiredField(offset, 4) // consumer_id
  builder.requiredField(offset, 6) // producer_id
  builder.requiredField(offset, 10) // rtp_parameters
  builder.requiredField(offset, 14) // consumable_rtp_encodings
  return offset;
}

static finishConsumeRequestBuffer(builder:flatbuffers.Builder, offset:flatbuffers.Offset) {
  builder.finish(offset);
}

static finishSizePrefixedConsumeRequestBuffer(builder:flatbuffers.Builder, offset:flatbuffers.Offset) {
  builder.finish(offset, undefined, true);
}


unpack(): ConsumeRequestT {
  return new ConsumeRequestT(
    this.consumerId(),
    this.producerId(),
    this.kind(),
    (this.rtpParameters() !== null ? this.rtpParameters()!.unpack() : null),
    this.type(),
    this.bb!.createObjList(this.consumableRtpEncodings.bind(this), this.consumableRtpEncodingsLength()),
    this.paused(),
    (this.preferredLayers() !== null ? this.preferredLayers()!.unpack() : null),
    this.ignoreDtx()
  );
}


unpackTo(_o: ConsumeRequestT): void {
  _o.consumerId = this.consumerId();
  _o.producerId = this.producerId();
  _o.kind = this.kind();
  _o.rtpParameters = (this.rtpParameters() !== null ? this.rtpParameters()!.unpack() : null);
  _o.type = this.type();
  _o.consumableRtpEncodings = this.bb!.createObjList(this.consumableRtpEncodings.bind(this), this.consumableRtpEncodingsLength());
  _o.paused = this.paused();
  _o.preferredLayers = (this.preferredLayers() !== null ? this.preferredLayers()!.unpack() : null);
  _o.ignoreDtx = this.ignoreDtx();
}
}

export class ConsumeRequestT {
constructor(
  public consumerId: string|Uint8Array|null = null,
  public producerId: string|Uint8Array|null = null,
  public kind: MediaKind = MediaKind.ALL,
  public rtpParameters: RtpParametersT|null = null,
  public type: Type = Type.NONE,
  public consumableRtpEncodings: (RtpEncodingParametersT)[] = [],
  public paused: boolean = false,
  public preferredLayers: ConsumerLayersT|null = null,
  public ignoreDtx: boolean = false
){}


pack(builder:flatbuffers.Builder): flatbuffers.Offset {
  const consumerId = (this.consumerId !== null ? builder.createString(this.consumerId!) : 0);
  const producerId = (this.producerId !== null ? builder.createString(this.producerId!) : 0);
  const rtpParameters = (this.rtpParameters !== null ? this.rtpParameters!.pack(builder) : 0);
  const consumableRtpEncodings = ConsumeRequest.createConsumableRtpEncodingsVector(builder, builder.createObjectOffsetList(this.consumableRtpEncodings));
  const preferredLayers = (this.preferredLayers !== null ? this.preferredLayers!.pack(builder) : 0);

  ConsumeRequest.startConsumeRequest(builder);
  ConsumeRequest.addConsumerId(builder, consumerId);
  ConsumeRequest.addProducerId(builder, producerId);
  ConsumeRequest.addKind(builder, this.kind);
  ConsumeRequest.addRtpParameters(builder, rtpParameters);
  ConsumeRequest.addType(builder, this.type);
  ConsumeRequest.addConsumableRtpEncodings(builder, consumableRtpEncodings);
  ConsumeRequest.addPaused(builder, this.paused);
  ConsumeRequest.addPreferredLayers(builder, preferredLayers);
  ConsumeRequest.addIgnoreDtx(builder, this.ignoreDtx);

  return ConsumeRequest.endConsumeRequest(builder);
}
}
