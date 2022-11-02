"use strict";
// automatically generated by the FlatBuffers compiler, do not modify
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseTransportDumpT = exports.BaseTransportDump = void 0;
const flatbuffers = require("flatbuffers");
const string_uint8_1 = require("../../fbs/common/string-uint8");
const uint32string_1 = require("../../fbs/common/uint32string");
const sctp_parameters_1 = require("../../fbs/sctp-parameters/sctp-parameters");
const rtp_listener_1 = require("../../fbs/transport/rtp-listener");
const sctp_listener_1 = require("../../fbs/transport/sctp-listener");
class BaseTransportDump {
    bb = null;
    bb_pos = 0;
    __init(i, bb) {
        this.bb_pos = i;
        this.bb = bb;
        return this;
    }
    static getRootAsBaseTransportDump(bb, obj) {
        return (obj || new BaseTransportDump()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    }
    static getSizePrefixedRootAsBaseTransportDump(bb, obj) {
        bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
        return (obj || new BaseTransportDump()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    }
    id(optionalEncoding) {
        const offset = this.bb.__offset(this.bb_pos, 4);
        return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null;
    }
    direct() {
        const offset = this.bb.__offset(this.bb_pos, 6);
        return offset ? !!this.bb.readInt8(this.bb_pos + offset) : false;
    }
    producerIds(index, optionalEncoding) {
        const offset = this.bb.__offset(this.bb_pos, 8);
        return offset ? this.bb.__string(this.bb.__vector(this.bb_pos + offset) + index * 4, optionalEncoding) : null;
    }
    producerIdsLength() {
        const offset = this.bb.__offset(this.bb_pos, 8);
        return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
    }
    consumerIds(index, optionalEncoding) {
        const offset = this.bb.__offset(this.bb_pos, 10);
        return offset ? this.bb.__string(this.bb.__vector(this.bb_pos + offset) + index * 4, optionalEncoding) : null;
    }
    consumerIdsLength() {
        const offset = this.bb.__offset(this.bb_pos, 10);
        return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
    }
    mapSsrcConsumerId(index, obj) {
        const offset = this.bb.__offset(this.bb_pos, 12);
        return offset ? (obj || new uint32string_1.Uint32String()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + offset) + index * 4), this.bb) : null;
    }
    mapSsrcConsumerIdLength() {
        const offset = this.bb.__offset(this.bb_pos, 12);
        return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
    }
    mapRtxSsrcConsumerId(index, obj) {
        const offset = this.bb.__offset(this.bb_pos, 14);
        return offset ? (obj || new uint32string_1.Uint32String()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + offset) + index * 4), this.bb) : null;
    }
    mapRtxSsrcConsumerIdLength() {
        const offset = this.bb.__offset(this.bb_pos, 14);
        return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
    }
    dataProducerIds(index, optionalEncoding) {
        const offset = this.bb.__offset(this.bb_pos, 16);
        return offset ? this.bb.__string(this.bb.__vector(this.bb_pos + offset) + index * 4, optionalEncoding) : null;
    }
    dataProducerIdsLength() {
        const offset = this.bb.__offset(this.bb_pos, 16);
        return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
    }
    dataConsumerIds(index, optionalEncoding) {
        const offset = this.bb.__offset(this.bb_pos, 18);
        return offset ? this.bb.__string(this.bb.__vector(this.bb_pos + offset) + index * 4, optionalEncoding) : null;
    }
    dataConsumerIdsLength() {
        const offset = this.bb.__offset(this.bb_pos, 18);
        return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
    }
    recvRtpHeaderExtensions(index, obj) {
        const offset = this.bb.__offset(this.bb_pos, 20);
        return offset ? (obj || new string_uint8_1.StringUint8()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + offset) + index * 4), this.bb) : null;
    }
    recvRtpHeaderExtensionsLength() {
        const offset = this.bb.__offset(this.bb_pos, 20);
        return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
    }
    rtpListener(obj) {
        const offset = this.bb.__offset(this.bb_pos, 22);
        return offset ? (obj || new rtp_listener_1.RtpListener()).__init(this.bb.__indirect(this.bb_pos + offset), this.bb) : null;
    }
    maxMessageSize() {
        const offset = this.bb.__offset(this.bb_pos, 24);
        return offset ? this.bb.readUint32(this.bb_pos + offset) : 0;
    }
    sctpParameters(obj) {
        const offset = this.bb.__offset(this.bb_pos, 26);
        return offset ? (obj || new sctp_parameters_1.SctpParameters()).__init(this.bb.__indirect(this.bb_pos + offset), this.bb) : null;
    }
    sctpState(optionalEncoding) {
        const offset = this.bb.__offset(this.bb_pos, 28);
        return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null;
    }
    sctpListener(obj) {
        const offset = this.bb.__offset(this.bb_pos, 30);
        return offset ? (obj || new sctp_listener_1.SctpListener()).__init(this.bb.__indirect(this.bb_pos + offset), this.bb) : null;
    }
    traceEventTypes(index, optionalEncoding) {
        const offset = this.bb.__offset(this.bb_pos, 32);
        return offset ? this.bb.__string(this.bb.__vector(this.bb_pos + offset) + index * 4, optionalEncoding) : null;
    }
    traceEventTypesLength() {
        const offset = this.bb.__offset(this.bb_pos, 32);
        return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
    }
    static startBaseTransportDump(builder) {
        builder.startObject(15);
    }
    static addId(builder, idOffset) {
        builder.addFieldOffset(0, idOffset, 0);
    }
    static addDirect(builder, direct) {
        builder.addFieldInt8(1, +direct, +false);
    }
    static addProducerIds(builder, producerIdsOffset) {
        builder.addFieldOffset(2, producerIdsOffset, 0);
    }
    static createProducerIdsVector(builder, data) {
        builder.startVector(4, data.length, 4);
        for (let i = data.length - 1; i >= 0; i--) {
            builder.addOffset(data[i]);
        }
        return builder.endVector();
    }
    static startProducerIdsVector(builder, numElems) {
        builder.startVector(4, numElems, 4);
    }
    static addConsumerIds(builder, consumerIdsOffset) {
        builder.addFieldOffset(3, consumerIdsOffset, 0);
    }
    static createConsumerIdsVector(builder, data) {
        builder.startVector(4, data.length, 4);
        for (let i = data.length - 1; i >= 0; i--) {
            builder.addOffset(data[i]);
        }
        return builder.endVector();
    }
    static startConsumerIdsVector(builder, numElems) {
        builder.startVector(4, numElems, 4);
    }
    static addMapSsrcConsumerId(builder, mapSsrcConsumerIdOffset) {
        builder.addFieldOffset(4, mapSsrcConsumerIdOffset, 0);
    }
    static createMapSsrcConsumerIdVector(builder, data) {
        builder.startVector(4, data.length, 4);
        for (let i = data.length - 1; i >= 0; i--) {
            builder.addOffset(data[i]);
        }
        return builder.endVector();
    }
    static startMapSsrcConsumerIdVector(builder, numElems) {
        builder.startVector(4, numElems, 4);
    }
    static addMapRtxSsrcConsumerId(builder, mapRtxSsrcConsumerIdOffset) {
        builder.addFieldOffset(5, mapRtxSsrcConsumerIdOffset, 0);
    }
    static createMapRtxSsrcConsumerIdVector(builder, data) {
        builder.startVector(4, data.length, 4);
        for (let i = data.length - 1; i >= 0; i--) {
            builder.addOffset(data[i]);
        }
        return builder.endVector();
    }
    static startMapRtxSsrcConsumerIdVector(builder, numElems) {
        builder.startVector(4, numElems, 4);
    }
    static addDataProducerIds(builder, dataProducerIdsOffset) {
        builder.addFieldOffset(6, dataProducerIdsOffset, 0);
    }
    static createDataProducerIdsVector(builder, data) {
        builder.startVector(4, data.length, 4);
        for (let i = data.length - 1; i >= 0; i--) {
            builder.addOffset(data[i]);
        }
        return builder.endVector();
    }
    static startDataProducerIdsVector(builder, numElems) {
        builder.startVector(4, numElems, 4);
    }
    static addDataConsumerIds(builder, dataConsumerIdsOffset) {
        builder.addFieldOffset(7, dataConsumerIdsOffset, 0);
    }
    static createDataConsumerIdsVector(builder, data) {
        builder.startVector(4, data.length, 4);
        for (let i = data.length - 1; i >= 0; i--) {
            builder.addOffset(data[i]);
        }
        return builder.endVector();
    }
    static startDataConsumerIdsVector(builder, numElems) {
        builder.startVector(4, numElems, 4);
    }
    static addRecvRtpHeaderExtensions(builder, recvRtpHeaderExtensionsOffset) {
        builder.addFieldOffset(8, recvRtpHeaderExtensionsOffset, 0);
    }
    static createRecvRtpHeaderExtensionsVector(builder, data) {
        builder.startVector(4, data.length, 4);
        for (let i = data.length - 1; i >= 0; i--) {
            builder.addOffset(data[i]);
        }
        return builder.endVector();
    }
    static startRecvRtpHeaderExtensionsVector(builder, numElems) {
        builder.startVector(4, numElems, 4);
    }
    static addRtpListener(builder, rtpListenerOffset) {
        builder.addFieldOffset(9, rtpListenerOffset, 0);
    }
    static addMaxMessageSize(builder, maxMessageSize) {
        builder.addFieldInt32(10, maxMessageSize, 0);
    }
    static addSctpParameters(builder, sctpParametersOffset) {
        builder.addFieldOffset(11, sctpParametersOffset, 0);
    }
    static addSctpState(builder, sctpStateOffset) {
        builder.addFieldOffset(12, sctpStateOffset, 0);
    }
    static addSctpListener(builder, sctpListenerOffset) {
        builder.addFieldOffset(13, sctpListenerOffset, 0);
    }
    static addTraceEventTypes(builder, traceEventTypesOffset) {
        builder.addFieldOffset(14, traceEventTypesOffset, 0);
    }
    static createTraceEventTypesVector(builder, data) {
        builder.startVector(4, data.length, 4);
        for (let i = data.length - 1; i >= 0; i--) {
            builder.addOffset(data[i]);
        }
        return builder.endVector();
    }
    static startTraceEventTypesVector(builder, numElems) {
        builder.startVector(4, numElems, 4);
    }
    static endBaseTransportDump(builder) {
        const offset = builder.endObject();
        builder.requiredField(offset, 4); // id
        builder.requiredField(offset, 8); // producer_ids
        builder.requiredField(offset, 10); // consumer_ids
        builder.requiredField(offset, 12); // map_ssrc_consumer_id
        builder.requiredField(offset, 14); // map_rtx_ssrc_consumer_id
        builder.requiredField(offset, 16); // data_producer_ids
        builder.requiredField(offset, 18); // data_consumer_ids
        builder.requiredField(offset, 20); // recv_rtp_header_extensions
        builder.requiredField(offset, 22); // rtp_listener
        builder.requiredField(offset, 32); // trace_event_types
        return offset;
    }
    unpack() {
        return new BaseTransportDumpT(this.id(), this.direct(), this.bb.createScalarList(this.producerIds.bind(this), this.producerIdsLength()), this.bb.createScalarList(this.consumerIds.bind(this), this.consumerIdsLength()), this.bb.createObjList(this.mapSsrcConsumerId.bind(this), this.mapSsrcConsumerIdLength()), this.bb.createObjList(this.mapRtxSsrcConsumerId.bind(this), this.mapRtxSsrcConsumerIdLength()), this.bb.createScalarList(this.dataProducerIds.bind(this), this.dataProducerIdsLength()), this.bb.createScalarList(this.dataConsumerIds.bind(this), this.dataConsumerIdsLength()), this.bb.createObjList(this.recvRtpHeaderExtensions.bind(this), this.recvRtpHeaderExtensionsLength()), (this.rtpListener() !== null ? this.rtpListener().unpack() : null), this.maxMessageSize(), (this.sctpParameters() !== null ? this.sctpParameters().unpack() : null), this.sctpState(), (this.sctpListener() !== null ? this.sctpListener().unpack() : null), this.bb.createScalarList(this.traceEventTypes.bind(this), this.traceEventTypesLength()));
    }
    unpackTo(_o) {
        _o.id = this.id();
        _o.direct = this.direct();
        _o.producerIds = this.bb.createScalarList(this.producerIds.bind(this), this.producerIdsLength());
        _o.consumerIds = this.bb.createScalarList(this.consumerIds.bind(this), this.consumerIdsLength());
        _o.mapSsrcConsumerId = this.bb.createObjList(this.mapSsrcConsumerId.bind(this), this.mapSsrcConsumerIdLength());
        _o.mapRtxSsrcConsumerId = this.bb.createObjList(this.mapRtxSsrcConsumerId.bind(this), this.mapRtxSsrcConsumerIdLength());
        _o.dataProducerIds = this.bb.createScalarList(this.dataProducerIds.bind(this), this.dataProducerIdsLength());
        _o.dataConsumerIds = this.bb.createScalarList(this.dataConsumerIds.bind(this), this.dataConsumerIdsLength());
        _o.recvRtpHeaderExtensions = this.bb.createObjList(this.recvRtpHeaderExtensions.bind(this), this.recvRtpHeaderExtensionsLength());
        _o.rtpListener = (this.rtpListener() !== null ? this.rtpListener().unpack() : null);
        _o.maxMessageSize = this.maxMessageSize();
        _o.sctpParameters = (this.sctpParameters() !== null ? this.sctpParameters().unpack() : null);
        _o.sctpState = this.sctpState();
        _o.sctpListener = (this.sctpListener() !== null ? this.sctpListener().unpack() : null);
        _o.traceEventTypes = this.bb.createScalarList(this.traceEventTypes.bind(this), this.traceEventTypesLength());
    }
}
exports.BaseTransportDump = BaseTransportDump;
class BaseTransportDumpT {
    id;
    direct;
    producerIds;
    consumerIds;
    mapSsrcConsumerId;
    mapRtxSsrcConsumerId;
    dataProducerIds;
    dataConsumerIds;
    recvRtpHeaderExtensions;
    rtpListener;
    maxMessageSize;
    sctpParameters;
    sctpState;
    sctpListener;
    traceEventTypes;
    constructor(id = null, direct = false, producerIds = [], consumerIds = [], mapSsrcConsumerId = [], mapRtxSsrcConsumerId = [], dataProducerIds = [], dataConsumerIds = [], recvRtpHeaderExtensions = [], rtpListener = null, maxMessageSize = 0, sctpParameters = null, sctpState = null, sctpListener = null, traceEventTypes = []) {
        this.id = id;
        this.direct = direct;
        this.producerIds = producerIds;
        this.consumerIds = consumerIds;
        this.mapSsrcConsumerId = mapSsrcConsumerId;
        this.mapRtxSsrcConsumerId = mapRtxSsrcConsumerId;
        this.dataProducerIds = dataProducerIds;
        this.dataConsumerIds = dataConsumerIds;
        this.recvRtpHeaderExtensions = recvRtpHeaderExtensions;
        this.rtpListener = rtpListener;
        this.maxMessageSize = maxMessageSize;
        this.sctpParameters = sctpParameters;
        this.sctpState = sctpState;
        this.sctpListener = sctpListener;
        this.traceEventTypes = traceEventTypes;
    }
    pack(builder) {
        const id = (this.id !== null ? builder.createString(this.id) : 0);
        const producerIds = BaseTransportDump.createProducerIdsVector(builder, builder.createObjectOffsetList(this.producerIds));
        const consumerIds = BaseTransportDump.createConsumerIdsVector(builder, builder.createObjectOffsetList(this.consumerIds));
        const mapSsrcConsumerId = BaseTransportDump.createMapSsrcConsumerIdVector(builder, builder.createObjectOffsetList(this.mapSsrcConsumerId));
        const mapRtxSsrcConsumerId = BaseTransportDump.createMapRtxSsrcConsumerIdVector(builder, builder.createObjectOffsetList(this.mapRtxSsrcConsumerId));
        const dataProducerIds = BaseTransportDump.createDataProducerIdsVector(builder, builder.createObjectOffsetList(this.dataProducerIds));
        const dataConsumerIds = BaseTransportDump.createDataConsumerIdsVector(builder, builder.createObjectOffsetList(this.dataConsumerIds));
        const recvRtpHeaderExtensions = BaseTransportDump.createRecvRtpHeaderExtensionsVector(builder, builder.createObjectOffsetList(this.recvRtpHeaderExtensions));
        const rtpListener = (this.rtpListener !== null ? this.rtpListener.pack(builder) : 0);
        const sctpParameters = (this.sctpParameters !== null ? this.sctpParameters.pack(builder) : 0);
        const sctpState = (this.sctpState !== null ? builder.createString(this.sctpState) : 0);
        const sctpListener = (this.sctpListener !== null ? this.sctpListener.pack(builder) : 0);
        const traceEventTypes = BaseTransportDump.createTraceEventTypesVector(builder, builder.createObjectOffsetList(this.traceEventTypes));
        BaseTransportDump.startBaseTransportDump(builder);
        BaseTransportDump.addId(builder, id);
        BaseTransportDump.addDirect(builder, this.direct);
        BaseTransportDump.addProducerIds(builder, producerIds);
        BaseTransportDump.addConsumerIds(builder, consumerIds);
        BaseTransportDump.addMapSsrcConsumerId(builder, mapSsrcConsumerId);
        BaseTransportDump.addMapRtxSsrcConsumerId(builder, mapRtxSsrcConsumerId);
        BaseTransportDump.addDataProducerIds(builder, dataProducerIds);
        BaseTransportDump.addDataConsumerIds(builder, dataConsumerIds);
        BaseTransportDump.addRecvRtpHeaderExtensions(builder, recvRtpHeaderExtensions);
        BaseTransportDump.addRtpListener(builder, rtpListener);
        BaseTransportDump.addMaxMessageSize(builder, this.maxMessageSize);
        BaseTransportDump.addSctpParameters(builder, sctpParameters);
        BaseTransportDump.addSctpState(builder, sctpState);
        BaseTransportDump.addSctpListener(builder, sctpListener);
        BaseTransportDump.addTraceEventTypes(builder, traceEventTypes);
        return BaseTransportDump.endBaseTransportDump(builder);
    }
}
exports.BaseTransportDumpT = BaseTransportDumpT;
