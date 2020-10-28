"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pipePipeline = void 0;
async function pipePipeline(context, next) {
    let pipe = context.injector.get(context.metaData.pipe);
    context.metaData = context.metaData.metaData;
    let result = await pipe.transform(context.value, context);
    context.setArgumentAt(context.index || 0, result);
    return next();
}
exports.pipePipeline = pipePipeline;
//# sourceMappingURL=pipePipeline.js.map