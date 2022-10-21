"use strict";
// automatically generated by the FlatBuffers compiler, do not modify
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebRtcTransportDumpT = exports.WebRtcTransportDump = void 0;
const flatbuffers = require("flatbuffers");
const dtls_parameters_1 = require("../../fbs/transport/dtls-parameters");
const ice_candidate_1 = require("../../fbs/transport/ice-candidate");
const ice_parameters_1 = require("../../fbs/transport/ice-parameters");
const ice_selected_tuple_1 = require("../../fbs/transport/ice-selected-tuple");
const transport_dump_1 = require("../../fbs/transport/transport-dump");
class WebRtcTransportDump {
    bb = null;
    bb_pos = 0;
    __init(i, bb) {
        this.bb_pos = i;
        this.bb = bb;
        return this;
    }
    static getRootAsWebRtcTransportDump(bb, obj) {
        return (obj || new WebRtcTransportDump()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    }
    static getSizePrefixedRootAsWebRtcTransportDump(bb, obj) {
        bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
        return (obj || new WebRtcTransportDump()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    }
    base(obj) {
        const offset = this.bb.__offset(this.bb_pos, 4);
        return offset ? (obj || new transport_dump_1.TransportDump()).__init(this.bb.__indirect(this.bb_pos + offset), this.bb) : null;
    }
    iceRole(optionalEncoding) {
        const offset = this.bb.__offset(this.bb_pos, 6);
        return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null;
    }
    iceParameters(obj) {
        const offset = this.bb.__offset(this.bb_pos, 8);
        return offset ? (obj || new ice_parameters_1.IceParameters()).__init(this.bb.__indirect(this.bb_pos + offset), this.bb) : null;
    }
    iceCandidates(index, obj) {
        const offset = this.bb.__offset(this.bb_pos, 10);
        return offset ? (obj || new ice_candidate_1.IceCandidate()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + offset) + index * 4), this.bb) : null;
    }
    iceCandidatesLength() {
        const offset = this.bb.__offset(this.bb_pos, 10);
        return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
    }
    iceState(optionalEncoding) {
        const offset = this.bb.__offset(this.bb_pos, 12);
        return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null;
    }
    iceSelectedTuple(obj) {
        const offset = this.bb.__offset(this.bb_pos, 14);
        return offset ? (obj || new ice_selected_tuple_1.IceSelectedTuple()).__init(this.bb.__indirect(this.bb_pos + offset), this.bb) : null;
    }
    dtlsParameters(obj) {
        const offset = this.bb.__offset(this.bb_pos, 16);
        return offset ? (obj || new dtls_parameters_1.DtlsParameters()).__init(this.bb.__indirect(this.bb_pos + offset), this.bb) : null;
    }
    static startWebRtcTransportDump(builder) {
        builder.startObject(7);
    }
    static addBase(builder, baseOffset) {
        builder.addFieldOffset(0, baseOffset, 0);
    }
    static addIceRole(builder, iceRoleOffset) {
        builder.addFieldOffset(1, iceRoleOffset, 0);
    }
    static addIceParameters(builder, iceParametersOffset) {
        builder.addFieldOffset(2, iceParametersOffset, 0);
    }
    static addIceCandidates(builder, iceCandidatesOffset) {
        builder.addFieldOffset(3, iceCandidatesOffset, 0);
    }
    static createIceCandidatesVector(builder, data) {
        builder.startVector(4, data.length, 4);
        for (let i = data.length - 1; i >= 0; i--) {
            builder.addOffset(data[i]);
        }
        return builder.endVector();
    }
    static startIceCandidatesVector(builder, numElems) {
        builder.startVector(4, numElems, 4);
    }
    static addIceState(builder, iceStateOffset) {
        builder.addFieldOffset(4, iceStateOffset, 0);
    }
    static addIceSelectedTuple(builder, iceSelectedTupleOffset) {
        builder.addFieldOffset(5, iceSelectedTupleOffset, 0);
    }
    static addDtlsParameters(builder, dtlsParametersOffset) {
        builder.addFieldOffset(6, dtlsParametersOffset, 0);
    }
    static endWebRtcTransportDump(builder) {
        const offset = builder.endObject();
        builder.requiredField(offset, 4); // base
        builder.requiredField(offset, 6); // ice_role
        builder.requiredField(offset, 8); // ice_parameters
        builder.requiredField(offset, 10); // ice_candidates
        builder.requiredField(offset, 12); // ice_state
        builder.requiredField(offset, 16); // dtls_parameters
        return offset;
    }
    unpack() {
        return new WebRtcTransportDumpT((this.base() !== null ? this.base().unpack() : null), this.iceRole(), (this.iceParameters() !== null ? this.iceParameters().unpack() : null), this.bb.createObjList(this.iceCandidates.bind(this), this.iceCandidatesLength()), this.iceState(), (this.iceSelectedTuple() !== null ? this.iceSelectedTuple().unpack() : null), (this.dtlsParameters() !== null ? this.dtlsParameters().unpack() : null));
    }
    unpackTo(_o) {
        _o.base = (this.base() !== null ? this.base().unpack() : null);
        _o.iceRole = this.iceRole();
        _o.iceParameters = (this.iceParameters() !== null ? this.iceParameters().unpack() : null);
        _o.iceCandidates = this.bb.createObjList(this.iceCandidates.bind(this), this.iceCandidatesLength());
        _o.iceState = this.iceState();
        _o.iceSelectedTuple = (this.iceSelectedTuple() !== null ? this.iceSelectedTuple().unpack() : null);
        _o.dtlsParameters = (this.dtlsParameters() !== null ? this.dtlsParameters().unpack() : null);
    }
}
exports.WebRtcTransportDump = WebRtcTransportDump;
class WebRtcTransportDumpT {
    base;
    iceRole;
    iceParameters;
    iceCandidates;
    iceState;
    iceSelectedTuple;
    dtlsParameters;
    constructor(base = null, iceRole = null, iceParameters = null, iceCandidates = [], iceState = null, iceSelectedTuple = null, dtlsParameters = null) {
        this.base = base;
        this.iceRole = iceRole;
        this.iceParameters = iceParameters;
        this.iceCandidates = iceCandidates;
        this.iceState = iceState;
        this.iceSelectedTuple = iceSelectedTuple;
        this.dtlsParameters = dtlsParameters;
    }
    pack(builder) {
        const base = (this.base !== null ? this.base.pack(builder) : 0);
        const iceRole = (this.iceRole !== null ? builder.createString(this.iceRole) : 0);
        const iceParameters = (this.iceParameters !== null ? this.iceParameters.pack(builder) : 0);
        const iceCandidates = WebRtcTransportDump.createIceCandidatesVector(builder, builder.createObjectOffsetList(this.iceCandidates));
        const iceState = (this.iceState !== null ? builder.createString(this.iceState) : 0);
        const iceSelectedTuple = (this.iceSelectedTuple !== null ? this.iceSelectedTuple.pack(builder) : 0);
        const dtlsParameters = (this.dtlsParameters !== null ? this.dtlsParameters.pack(builder) : 0);
        WebRtcTransportDump.startWebRtcTransportDump(builder);
        WebRtcTransportDump.addBase(builder, base);
        WebRtcTransportDump.addIceRole(builder, iceRole);
        WebRtcTransportDump.addIceParameters(builder, iceParameters);
        WebRtcTransportDump.addIceCandidates(builder, iceCandidates);
        WebRtcTransportDump.addIceState(builder, iceState);
        WebRtcTransportDump.addIceSelectedTuple(builder, iceSelectedTuple);
        WebRtcTransportDump.addDtlsParameters(builder, dtlsParameters);
        return WebRtcTransportDump.endWebRtcTransportDump(builder);
    }
}
exports.WebRtcTransportDumpT = WebRtcTransportDumpT;
