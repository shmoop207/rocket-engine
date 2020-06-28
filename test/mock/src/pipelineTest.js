"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PipelineTestOnCreate = exports.PipelineTest2 = exports.PipelineTest = void 0;
const tslib_1 = require("tslib");
const index_1 = require("../../../index");
let PipelineTest = class PipelineTest {
    async run(context, next) {
        context.getArgumentAt(0).push(2);
        return next();
    }
};
PipelineTest = tslib_1.__decorate([
    index_1.define()
], PipelineTest);
exports.PipelineTest = PipelineTest;
let PipelineTest2 = class PipelineTest2 {
    async run(context, next) {
        context.getArgumentAt(0).push(3);
        return next();
    }
};
PipelineTest2 = tslib_1.__decorate([
    index_1.define()
], PipelineTest2);
exports.PipelineTest2 = PipelineTest2;
let PipelineTestOnCreate = class PipelineTestOnCreate {
    async run(context, next) {
        context.instance["onCreateTest"] = true;
        return next();
    }
};
PipelineTestOnCreate = tslib_1.__decorate([
    index_1.define()
], PipelineTestOnCreate);
exports.PipelineTestOnCreate = PipelineTestOnCreate;
//# sourceMappingURL=pipelineTest.js.map