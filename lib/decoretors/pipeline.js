"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appolo_utils_1 = require("appolo-utils");
exports.PipeSymbol = "__PipeSymbol__";
exports.PipeSetSymbol = "__PipeSetSymbol__";
function pipeline(pipeline, metaData, options) {
    return function (target, propertyKey, descriptor) {
        let result = appolo_utils_1.Reflector.getMetadata(exports.PipeSymbol, target.constructor, undefined, {});
        if (!result[propertyKey]) {
            result[propertyKey] = [];
        }
        let index = NaN;
        let isParam = typeof descriptor == "number";
        if (isParam) {
            index = descriptor;
        }
        result[propertyKey][isParam ? "unshift" : "push"]({ pipeline, metaData, options, index });
    };
}
exports.pipeline = pipeline;
//# sourceMappingURL=pipeline.js.map