"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reflector_1 = require("../util/reflector");
exports.PipeSymbol = "__PipeSymbol__";
exports.PipeSetSymbol = "__PipeSetSymbol__";
function pipeline(pipeline, metaData, options) {
    return function (target, propertyKey, descriptor) {
        let result = reflector_1.Reflector.getOwnMetadata(exports.PipeSymbol, target.constructor, undefined, {});
        if (!result[propertyKey]) {
            result[propertyKey] = [];
        }
        let index = NaN;
        if (typeof descriptor == "number") {
            index = descriptor;
        }
        result[propertyKey].push({ pipeline, metaData, options, index });
    };
}
exports.pipeline = pipeline;
//# sourceMappingURL=pipeline.js.map