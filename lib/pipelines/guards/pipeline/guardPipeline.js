"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.guardPipeline = void 0;
const guardError_1 = require("../errors/guardError");
async function guardPipeline(context, next) {
    let guard = context.injector.get(context.metaData.guard);
    context.metaData = context.metaData.metaData;
    let result = await guard.isValid(context);
    if (!result) {
        throw new guardError_1.GuardError();
    }
    return next();
}
exports.guardPipeline = guardPipeline;
//# sourceMappingURL=guardPipeline.js.map