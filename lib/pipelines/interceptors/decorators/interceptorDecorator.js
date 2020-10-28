"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.intercept = void 0;
const pipelineDecorators_1 = require("../../decoreators/pipelineDecorators");
const interceptorPipeline_1 = require("../pipeline/interceptorPipeline");
function intercept(interceptor, metaData, options) {
    return pipelineDecorators_1.pipelineDecorator(interceptorPipeline_1.interceptorPipeline, { interceptor, metaData }, options);
}
exports.intercept = intercept;
//# sourceMappingURL=interceptorDecorator.js.map