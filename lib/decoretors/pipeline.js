"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("../util/util");
exports.PipeSymbol = Symbol("__PipeSymbol__");
exports.PipeSetSymbol = Symbol("__PipeSetSymbol__");
function pipeline(pipeline, metaData, options) {
    return function (target, propertyKey, descriptor) {
        let result = util_1.Util.getReflectData(exports.PipeSymbol, target.constructor, {});
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