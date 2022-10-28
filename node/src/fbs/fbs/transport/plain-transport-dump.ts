// automatically generated by the FlatBuffers compiler, do not modify

import * as flatbuffers from 'flatbuffers';

import { SrtpParameters, SrtpParametersT } from '../../fbs/transport/srtp-parameters';
import { TransportDumpResponse, TransportDumpResponseT } from '../../fbs/transport/transport-dump-response';
import { Tuple, TupleT } from '../../fbs/transport/tuple';


export class PlainTransportDump {
  bb: flatbuffers.ByteBuffer|null = null;
  bb_pos = 0;
  __init(i:number, bb:flatbuffers.ByteBuffer):PlainTransportDump {
  this.bb_pos = i;
  this.bb = bb;
  return this;
}

static getRootAsPlainTransportDump(bb:flatbuffers.ByteBuffer, obj?:PlainTransportDump):PlainTransportDump {
  return (obj || new PlainTransportDump()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

static getSizePrefixedRootAsPlainTransportDump(bb:flatbuffers.ByteBuffer, obj?:PlainTransportDump):PlainTransportDump {
  bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
  return (obj || new PlainTransportDump()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

base(obj?:TransportDumpResponse):TransportDumpResponse|null {
  const offset = this.bb!.__offset(this.bb_pos, 4);
  return offset ? (obj || new TransportDumpResponse()).__init(this.bb!.__indirect(this.bb_pos + offset), this.bb!) : null;
}

rtcMux():boolean {
  const offset = this.bb!.__offset(this.bb_pos, 6);
  return offset ? !!this.bb!.readInt8(this.bb_pos + offset) : false;
}

comedia():boolean {
  const offset = this.bb!.__offset(this.bb_pos, 8);
  return offset ? !!this.bb!.readInt8(this.bb_pos + offset) : false;
}

tuple(obj?:Tuple):Tuple|null {
  const offset = this.bb!.__offset(this.bb_pos, 10);
  return offset ? (obj || new Tuple()).__init(this.bb!.__indirect(this.bb_pos + offset), this.bb!) : null;
}

rtcpTuple(obj?:Tuple):Tuple|null {
  const offset = this.bb!.__offset(this.bb_pos, 12);
  return offset ? (obj || new Tuple()).__init(this.bb!.__indirect(this.bb_pos + offset), this.bb!) : null;
}

srtpParameters(obj?:SrtpParameters):SrtpParameters|null {
  const offset = this.bb!.__offset(this.bb_pos, 14);
  return offset ? (obj || new SrtpParameters()).__init(this.bb!.__indirect(this.bb_pos + offset), this.bb!) : null;
}

static startPlainTransportDump(builder:flatbuffers.Builder) {
  builder.startObject(6);
}

static addBase(builder:flatbuffers.Builder, baseOffset:flatbuffers.Offset) {
  builder.addFieldOffset(0, baseOffset, 0);
}

static addRtcMux(builder:flatbuffers.Builder, rtcMux:boolean) {
  builder.addFieldInt8(1, +rtcMux, +false);
}

static addComedia(builder:flatbuffers.Builder, comedia:boolean) {
  builder.addFieldInt8(2, +comedia, +false);
}

static addTuple(builder:flatbuffers.Builder, tupleOffset:flatbuffers.Offset) {
  builder.addFieldOffset(3, tupleOffset, 0);
}

static addRtcpTuple(builder:flatbuffers.Builder, rtcpTupleOffset:flatbuffers.Offset) {
  builder.addFieldOffset(4, rtcpTupleOffset, 0);
}

static addSrtpParameters(builder:flatbuffers.Builder, srtpParametersOffset:flatbuffers.Offset) {
  builder.addFieldOffset(5, srtpParametersOffset, 0);
}

static endPlainTransportDump(builder:flatbuffers.Builder):flatbuffers.Offset {
  const offset = builder.endObject();
  builder.requiredField(offset, 4) // base
  return offset;
}


unpack(): PlainTransportDumpT {
  return new PlainTransportDumpT(
    (this.base() !== null ? this.base()!.unpack() : null),
    this.rtcMux(),
    this.comedia(),
    (this.tuple() !== null ? this.tuple()!.unpack() : null),
    (this.rtcpTuple() !== null ? this.rtcpTuple()!.unpack() : null),
    (this.srtpParameters() !== null ? this.srtpParameters()!.unpack() : null)
  );
}


unpackTo(_o: PlainTransportDumpT): void {
  _o.base = (this.base() !== null ? this.base()!.unpack() : null);
  _o.rtcMux = this.rtcMux();
  _o.comedia = this.comedia();
  _o.tuple = (this.tuple() !== null ? this.tuple()!.unpack() : null);
  _o.rtcpTuple = (this.rtcpTuple() !== null ? this.rtcpTuple()!.unpack() : null);
  _o.srtpParameters = (this.srtpParameters() !== null ? this.srtpParameters()!.unpack() : null);
}
}

export class PlainTransportDumpT {
constructor(
  public base: TransportDumpResponseT|null = null,
  public rtcMux: boolean = false,
  public comedia: boolean = false,
  public tuple: TupleT|null = null,
  public rtcpTuple: TupleT|null = null,
  public srtpParameters: SrtpParametersT|null = null
){}


pack(builder:flatbuffers.Builder): flatbuffers.Offset {
  const base = (this.base !== null ? this.base!.pack(builder) : 0);
  const tuple = (this.tuple !== null ? this.tuple!.pack(builder) : 0);
  const rtcpTuple = (this.rtcpTuple !== null ? this.rtcpTuple!.pack(builder) : 0);
  const srtpParameters = (this.srtpParameters !== null ? this.srtpParameters!.pack(builder) : 0);

  PlainTransportDump.startPlainTransportDump(builder);
  PlainTransportDump.addBase(builder, base);
  PlainTransportDump.addRtcMux(builder, this.rtcMux);
  PlainTransportDump.addComedia(builder, this.comedia);
  PlainTransportDump.addTuple(builder, tuple);
  PlainTransportDump.addRtcpTuple(builder, rtcpTuple);
  PlainTransportDump.addSrtpParameters(builder, srtpParameters);

  return PlainTransportDump.endPlainTransportDump(builder);
}
}
