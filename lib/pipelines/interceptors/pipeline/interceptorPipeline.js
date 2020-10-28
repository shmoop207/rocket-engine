"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.interceptorPipeline = void 0;
async function interceptorPipeline(context, next) {
    let interceptor = context.injector.get(context.metaData.interceptor);
    context.metaData = context.metaData.metaData;
    return interceptor.intercept(context, next);
}
exports.interceptorPipeline = interceptorPipeline;
//# sourceMappingURL=interceptorPipeline.js.map