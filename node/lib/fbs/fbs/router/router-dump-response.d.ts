import * as flatbuffers from 'flatbuffers';
import { StringString, StringStringT } from '../../fbs/common/string-string';
import { StringStringArray, StringStringArrayT } from '../../fbs/common/string-string-array';
export declare class RouterDumpResponse {
    bb: flatbuffers.ByteBuffer | null;
    bb_pos: number;
    __init(i: number, bb: flatbuffers.ByteBuffer): RouterDumpResponse;
    static getRootAsRouterDumpResponse(bb: flatbuffers.ByteBuffer, obj?: RouterDumpResponse): RouterDumpResponse;
    static getSizePrefixedRootAsRouterDumpResponse(bb: flatbuffers.ByteBuffer, obj?: RouterDumpResponse): RouterDumpResponse;
    id(): string | null;
    id(optionalEncoding: flatbuffers.Encoding): string | Uint8Array | null;
    transportIds(index: number): string;
    transportIds(index: number, optionalEncoding: flatbuffers.Encoding): string | Uint8Array;
    transportIdsLength(): number;
    rtpObserverIds(index: number): string;
    rtpObserverIds(index: number, optionalEncoding: flatbuffers.Encoding): string | Uint8Array;
    rtpObserverIdsLength(): number;
    mapProducerIdConsumerIds(index: number, obj?: StringStringArray): StringStringArray | null;
    mapProducerIdConsumerIdsLength(): number;
    mapConsumerIdProducerId(index: number, obj?: StringString): StringString | null;
    mapConsumerIdProducerIdLength(): number;
    mapProducerIdObserverIds(index: number, obj?: StringStringArray): StringStringArray | null;
    mapProducerIdObserverIdsLength(): number;
    mapDataProducerIdDataConsumerIds(index: number, obj?: StringStringArray): StringStringArray | null;
    mapDataProducerIdDataConsumerIdsLength(): number;
    mapDataConsumerIdDataProducerId(index: number, obj?: StringString): StringString | null;
    mapDataConsumerIdDataProducerIdLength(): number;
    static startRouterDumpResponse(builder: flatbuffers.Builder): void;
    static addId(builder: flatbuffers.Builder, idOffset: flatbuffers.Offset): void;
    static addTransportIds(builder: flatbuffers.Builder, transportIdsOffset: flatbuffers.Offset): void;
    static createTransportIdsVector(builder: flatbuffers.Builder, data: flatbuffers.Offset[]): flatbuffers.Offset;
    static startTransportIdsVector(builder: flatbuffers.Builder, numElems: number): void;
    static addRtpObserverIds(builder: flatbuffers.Builder, rtpObserverIdsOffset: flatbuffers.Offset): void;
    static createRtpObserverIdsVector(builder: flatbuffers.Builder, data: flatbuffers.Offset[]): flatbuffers.Offset;
    static startRtpObserverIdsVector(builder: flatbuffers.Builder, numElems: number): void;
    static addMapProducerIdConsumerIds(builder: flatbuffers.Builder, mapProducerIdConsumerIdsOffset: flatbuffers.Offset): void;
    static createMapProducerIdConsumerIdsVector(builder: flatbuffers.Builder, data: flatbuffers.Offset[]): flatbuffers.Offset;
    static startMapProducerIdConsumerIdsVector(builder: flatbuffers.Builder, numElems: number): void;
    static addMapConsumerIdProducerId(builder: flatbuffers.Builder, mapConsumerIdProducerIdOffset: flatbuffers.Offset): void;
    static createMapConsumerIdProducerIdVector(builder: flatbuffers.Builder, data: flatbuffers.Offset[]): flatbuffers.Offset;
    static startMapConsumerIdProducerIdVector(builder: flatbuffers.Builder, numElems: number): void;
    static addMapProducerIdObserverIds(builder: flatbuffers.Builder, mapProducerIdObserverIdsOffset: flatbuffers.Offset): void;
    static createMapProducerIdObserverIdsVector(builder: flatbuffers.Builder, data: flatbuffers.Offset[]): flatbuffers.Offset;
    static startMapProducerIdObserverIdsVector(builder: flatbuffers.Builder, numElems: number): void;
    static addMapDataProducerIdDataConsumerIds(builder: flatbuffers.Builder, mapDataProducerIdDataConsumerIdsOffset: flatbuffers.Offset): void;
    static createMapDataProducerIdDataConsumerIdsVector(builder: flatbuffers.Builder, data: flatbuffers.Offset[]): flatbuffers.Offset;
    static startMapDataProducerIdDataConsumerIdsVector(builder: flatbuffers.Builder, numElems: number): void;
    static addMapDataConsumerIdDataProducerId(builder: flatbuffers.Builder, mapDataConsumerIdDataProducerIdOffset: flatbuffers.Offset): void;
    static createMapDataConsumerIdDataProducerIdVector(builder: flatbuffers.Builder, data: flatbuffers.Offset[]): flatbuffers.Offset;
    static startMapDataConsumerIdDataProducerIdVector(builder: flatbuffers.Builder, numElems: number): void;
    static endRouterDumpResponse(builder: flatbuffers.Builder): flatbuffers.Offset;
    static createRouterDumpResponse(builder: flatbuffers.Builder, idOffset: flatbuffers.Offset, transportIdsOffset: flatbuffers.Offset, rtpObserverIdsOffset: flatbuffers.Offset, mapProducerIdConsumerIdsOffset: flatbuffers.Offset, mapConsumerIdProducerIdOffset: flatbuffers.Offset, mapProducerIdObserverIdsOffset: flatbuffers.Offset, mapDataProducerIdDataConsumerIdsOffset: flatbuffers.Offset, mapDataConsumerIdDataProducerIdOffset: flatbuffers.Offset): flatbuffers.Offset;
    unpack(): RouterDumpResponseT;
    unpackTo(_o: RouterDumpResponseT): void;
}
export declare class RouterDumpResponseT {
    id: string | Uint8Array | null;
    transportIds: (string)[];
    rtpObserverIds: (string)[];
    mapProducerIdConsumerIds: (StringStringArrayT)[];
    mapConsumerIdProducerId: (StringStringT)[];
    mapProducerIdObserverIds: (StringStringArrayT)[];
    mapDataProducerIdDataConsumerIds: (StringStringArrayT)[];
    mapDataConsumerIdDataProducerId: (StringStringT)[];
    constructor(id?: string | Uint8Array | null, transportIds?: (string)[], rtpObserverIds?: (string)[], mapProducerIdConsumerIds?: (StringStringArrayT)[], mapConsumerIdProducerId?: (StringStringT)[], mapProducerIdObserverIds?: (StringStringArrayT)[], mapDataProducerIdDataConsumerIds?: (StringStringArrayT)[], mapDataConsumerIdDataProducerId?: (StringStringT)[]);
    pack(builder: flatbuffers.Builder): flatbuffers.Offset;
}
//# sourceMappingURL=router-dump-response.d.ts.map