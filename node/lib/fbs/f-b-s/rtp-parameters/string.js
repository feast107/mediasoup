"use strict";
// automatically generated by the FlatBuffers compiler, do not modify
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringT = exports.String = void 0;
const flatbuffers = require("flatbuffers");
class String {
    bb = null;
    bb_pos = 0;
    __init(i, bb) {
        this.bb_pos = i;
        this.bb = bb;
        return this;
    }
    static getRootAsString(bb, obj) {
        return (obj || new String()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    }
    static getSizePrefixedRootAsString(bb, obj) {
        bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
        return (obj || new String()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    }
    value(optionalEncoding) {
        const offset = this.bb.__offset(this.bb_pos, 4);
        return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null;
    }
    static startString(builder) {
        builder.startObject(1);
    }
    static addValue(builder, valueOffset) {
        builder.addFieldOffset(0, valueOffset, 0);
    }
    static endString(builder) {
        const offset = builder.endObject();
        return offset;
    }
    static createString(builder, valueOffset) {
        String.startString(builder);
        String.addValue(builder, valueOffset);
        return String.endString(builder);
    }
    unpack() {
        return new StringT(this.value());
    }
    unpackTo(_o) {
        _o.value = this.value();
    }
}
exports.String = String;
class StringT {
    value;
    constructor(value = null) {
        this.value = value;
    }
    pack(builder) {
        const value = (this.value !== null ? builder.createString(this.value) : 0);
        return String.createString(builder, value);
    }
}
exports.StringT = StringT;
