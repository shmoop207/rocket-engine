"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exceptionPipeline = void 0;
async function exceptionPipeline(context, next) {
    let exceptionCtr = context.metaData.exception;
    context.metaData = context.metaData.metaData;
    try {
        let result = await next();
        return result;
    }
    catch (e) {
        let exception = context.injector.get(exceptionCtr);
        return exception.catch(e, context);
    }
}
exports.exceptionPipeline = exceptionPipeline;
//# sourceMappingURL=exceptionPipeline.js.map