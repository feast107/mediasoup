"use strict";
// automatically generated by the FlatBuffers compiler, do not modify
Object.defineProperty(exports, "__esModule", { value: true });
exports.unionListToBody = exports.unionToBody = exports.Body = void 0;
const set_preferred_layers_response_1 = require("../../fbs/consumer/set-preferred-layers-response");
const set_priority_response_1 = require("../../fbs/consumer/set-priority-response");
const get_buffered_amount_response_1 = require("../../fbs/data-consumer/get-buffered-amount-response");
const dump_response_1 = require("../../fbs/data-producer/dump-response");
const dump_response_2 = require("../../fbs/router/dump-response");
const consume_response_1 = require("../../fbs/transport/consume-response");
const dump_response_3 = require("../../fbs/transport/dump-response");
const produce_response_1 = require("../../fbs/transport/produce-response");
const dump_response_4 = require("../../fbs/web-rtc-server/dump-response");
const dump_response_5 = require("../../fbs/worker/dump-response");
const resource_usage_response_1 = require("../../fbs/worker/resource-usage-response");
var Body;
(function (Body) {
    Body[Body["NONE"] = 0] = "NONE";
    Body[Body["FBS_Worker_DumpResponse"] = 1] = "FBS_Worker_DumpResponse";
    Body[Body["FBS_Worker_ResourceUsageResponse"] = 2] = "FBS_Worker_ResourceUsageResponse";
    Body[Body["FBS_WebRtcServer_DumpResponse"] = 3] = "FBS_WebRtcServer_DumpResponse";
    Body[Body["FBS_Router_DumpResponse"] = 4] = "FBS_Router_DumpResponse";
    Body[Body["FBS_Transport_DumpResponse"] = 5] = "FBS_Transport_DumpResponse";
    Body[Body["FBS_Transport_ProduceResponse"] = 6] = "FBS_Transport_ProduceResponse";
    Body[Body["FBS_Transport_ConsumeResponse"] = 7] = "FBS_Transport_ConsumeResponse";
    Body[Body["FBS_Consumer_SetPreferredLayersResponse"] = 8] = "FBS_Consumer_SetPreferredLayersResponse";
    Body[Body["FBS_Consumer_SetPriorityResponse"] = 9] = "FBS_Consumer_SetPriorityResponse";
    Body[Body["FBS_DataProducer_DumpResponse"] = 10] = "FBS_DataProducer_DumpResponse";
    Body[Body["FBS_DataConsumer_GetBufferedAmountResponse"] = 11] = "FBS_DataConsumer_GetBufferedAmountResponse";
})(Body = exports.Body || (exports.Body = {}));
function unionToBody(type, accessor) {
    switch (Body[type]) {
        case 'NONE': return null;
        case 'FBS_Worker_DumpResponse': return accessor(new dump_response_5.DumpResponse());
        case 'FBS_Worker_ResourceUsageResponse': return accessor(new resource_usage_response_1.ResourceUsageResponse());
        case 'FBS_WebRtcServer_DumpResponse': return accessor(new dump_response_4.DumpResponse());
        case 'FBS_Router_DumpResponse': return accessor(new dump_response_2.DumpResponse());
        case 'FBS_Transport_DumpResponse': return accessor(new dump_response_3.DumpResponse());
        case 'FBS_Transport_ProduceResponse': return accessor(new produce_response_1.ProduceResponse());
        case 'FBS_Transport_ConsumeResponse': return accessor(new consume_response_1.ConsumeResponse());
        case 'FBS_Consumer_SetPreferredLayersResponse': return accessor(new set_preferred_layers_response_1.SetPreferredLayersResponse());
        case 'FBS_Consumer_SetPriorityResponse': return accessor(new set_priority_response_1.SetPriorityResponse());
        case 'FBS_DataProducer_DumpResponse': return accessor(new dump_response_1.DumpResponse());
        case 'FBS_DataConsumer_GetBufferedAmountResponse': return accessor(new get_buffered_amount_response_1.GetBufferedAmountResponse());
        default: return null;
    }
}
exports.unionToBody = unionToBody;
function unionListToBody(type, accessor, index) {
    switch (Body[type]) {
        case 'NONE': return null;
        case 'FBS_Worker_DumpResponse': return accessor(index, new dump_response_5.DumpResponse());
        case 'FBS_Worker_ResourceUsageResponse': return accessor(index, new resource_usage_response_1.ResourceUsageResponse());
        case 'FBS_WebRtcServer_DumpResponse': return accessor(index, new dump_response_4.DumpResponse());
        case 'FBS_Router_DumpResponse': return accessor(index, new dump_response_2.DumpResponse());
        case 'FBS_Transport_DumpResponse': return accessor(index, new dump_response_3.DumpResponse());
        case 'FBS_Transport_ProduceResponse': return accessor(index, new produce_response_1.ProduceResponse());
        case 'FBS_Transport_ConsumeResponse': return accessor(index, new consume_response_1.ConsumeResponse());
        case 'FBS_Consumer_SetPreferredLayersResponse': return accessor(index, new set_preferred_layers_response_1.SetPreferredLayersResponse());
        case 'FBS_Consumer_SetPriorityResponse': return accessor(index, new set_priority_response_1.SetPriorityResponse());
        case 'FBS_DataProducer_DumpResponse': return accessor(index, new dump_response_1.DumpResponse());
        case 'FBS_DataConsumer_GetBufferedAmountResponse': return accessor(index, new get_buffered_amount_response_1.GetBufferedAmountResponse());
        default: return null;
    }
}
exports.unionListToBody = unionListToBody;
