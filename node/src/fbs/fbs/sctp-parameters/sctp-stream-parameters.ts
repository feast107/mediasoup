// automatically generated by the FlatBuffers compiler, do not modify

import * as flatbuffers from 'flatbuffers';



export class SctpStreamParameters {
  bb: flatbuffers.ByteBuffer|null = null;
  bb_pos = 0;
  __init(i:number, bb:flatbuffers.ByteBuffer):SctpStreamParameters {
  this.bb_pos = i;
  this.bb = bb;
  return this;
}

static getRootAsSctpStreamParameters(bb:flatbuffers.ByteBuffer, obj?:SctpStreamParameters):SctpStreamParameters {
  return (obj || new SctpStreamParameters()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

static getSizePrefixedRootAsSctpStreamParameters(bb:flatbuffers.ByteBuffer, obj?:SctpStreamParameters):SctpStreamParameters {
  bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
  return (obj || new SctpStreamParameters()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

streamId():number {
  const offset = this.bb!.__offset(this.bb_pos, 4);
  return offset ? this.bb!.readUint16(this.bb_pos + offset) : 0;
}

ordered():boolean|null {
  const offset = this.bb!.__offset(this.bb_pos, 6);
  return offset ? !!this.bb!.readInt8(this.bb_pos + offset) : null;
}

maxPacketLifeTime():number|null {
  const offset = this.bb!.__offset(this.bb_pos, 8);
  return offset ? this.bb!.readUint16(this.bb_pos + offset) : null;
}

maxRetransmits():number|null {
  const offset = this.bb!.__offset(this.bb_pos, 10);
  return offset ? this.bb!.readUint16(this.bb_pos + offset) : null;
}

static startSctpStreamParameters(builder:flatbuffers.Builder) {
  builder.startObject(4);
}

static addStreamId(builder:flatbuffers.Builder, streamId:number) {
  builder.addFieldInt16(0, streamId, 0);
}

static addOrdered(builder:flatbuffers.Builder, ordered:boolean) {
  builder.addFieldInt8(1, +ordered, 0);
}

static addMaxPacketLifeTime(builder:flatbuffers.Builder, maxPacketLifeTime:number) {
  builder.addFieldInt16(2, maxPacketLifeTime, 0);
}

static addMaxRetransmits(builder:flatbuffers.Builder, maxRetransmits:number) {
  builder.addFieldInt16(3, maxRetransmits, 0);
}

static endSctpStreamParameters(builder:flatbuffers.Builder):flatbuffers.Offset {
  const offset = builder.endObject();
  return offset;
}

static createSctpStreamParameters(builder:flatbuffers.Builder, streamId:number, ordered:boolean|null, maxPacketLifeTime:number|null, maxRetransmits:number|null):flatbuffers.Offset {
  SctpStreamParameters.startSctpStreamParameters(builder);
  SctpStreamParameters.addStreamId(builder, streamId);
  if (ordered !== null)
    SctpStreamParameters.addOrdered(builder, ordered);
  if (maxPacketLifeTime !== null)
    SctpStreamParameters.addMaxPacketLifeTime(builder, maxPacketLifeTime);
  if (maxRetransmits !== null)
    SctpStreamParameters.addMaxRetransmits(builder, maxRetransmits);
  return SctpStreamParameters.endSctpStreamParameters(builder);
}

unpack(): SctpStreamParametersT {
  return new SctpStreamParametersT(
    this.streamId(),
    this.ordered(),
    this.maxPacketLifeTime(),
    this.maxRetransmits()
  );
}


unpackTo(_o: SctpStreamParametersT): void {
  _o.streamId = this.streamId();
  _o.ordered = this.ordered();
  _o.maxPacketLifeTime = this.maxPacketLifeTime();
  _o.maxRetransmits = this.maxRetransmits();
}
}

export class SctpStreamParametersT {
constructor(
  public streamId: number = 0,
  public ordered: boolean|null = null,
  public maxPacketLifeTime: number|null = null,
  public maxRetransmits: number|null = null
){}


pack(builder:flatbuffers.Builder): flatbuffers.Offset {
  return SctpStreamParameters.createSctpStreamParameters(builder,
    this.streamId,
    this.ordered,
    this.maxPacketLifeTime,
    this.maxRetransmits
  );
}
}
