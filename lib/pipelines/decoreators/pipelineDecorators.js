"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pipelineDecorator = exports.pipelineInstance = exports.pipelineType = exports.pipeline = exports.PipeInstanceCreateSymbol = exports.PipeKlassRegisterSymbol = exports.PipeSetSymbol = exports.PipeSymbol = void 0;
const utils_1 = require("@appolo/utils");
const utils_2 = require("@appolo/utils");
exports.PipeSymbol = "__PipeSymbol__";
exports.PipeSetSymbol = "__PipeSetSymbol__";
exports.PipeKlassRegisterSymbol = "__PipeKlassRegisterSymbol__";
exports.PipeInstanceCreateSymbol = "__PipeInstanceCreateSymbol__";
function pipeline(pipelineFn, metaData, options) {
    return function (target, propertyKey, descriptor) {
        let result = utils_1.Reflector.getMetadata(exports.PipeSymbol, target.constructor, undefined, {});
        if (!propertyKey) {
            let fnNames = utils_2.Classes.getClassMethodsName(target);
            fnNames.forEach(fnName => !fnName.startsWith("_") && pipeline(pipelineFn, metaData, options)(target.prototype, fnName));
            return;
        }
        if (!result[propertyKey]) {
            result[propertyKey] = [];
        }
        let index = NaN;
        let isParam = typeof descriptor == "number";
        if (isParam) {
            index = descriptor;
        }
        result[propertyKey][isParam ? "unshift" : "push"]({ pipeline: pipelineFn, metaData, options, index });
    };
}
exports.pipeline = pipeline;
function pipelineType(pipeline, metaData, options) {
    return function (target) {
        let result = utils_1.Reflector.getFnMetadata(exports.PipeKlassRegisterSymbol, target, []);
        result.push({
            pipeline,
            metaData,
            options,
        });
    };
}
exports.pipelineType = pipelineType;
function pipelineInstance(pipeline, metaData, options) {
    return function (target) {
        let result = utils_1.Reflector.getFnMetadata(exports.PipeInstanceCreateSymbol, target, []);
        result.push({
            pipeline,
            metaData,
            options,
        });
    };
}
exports.pipelineInstance = pipelineInstance;
function pipelineDecorator(pipelineFn, metaData, options) {
    return function (fn, propertyName, index) {
        pipeline(pipelineFn, metaData, options)(fn, propertyName, index);
    };
}
exports.pipelineDecorator = pipelineDecorator;
//# sourceMappingURL=pipelineDecorators.js.map