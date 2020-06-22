"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const index_1 = require("../../../index");
const pipelineTest_1 = require("./pipelineTest");
const pipeline_1 = require("../../../lib/decoretors/pipeline");
let Manager = class Manager extends index_1.EventDispatcher {
    constructor() {
        super();
    }
    run() {
        this.working = true;
        return true;
    }
};
Manager = tslib_1.__decorate([
    index_1.define(),
    index_1.singleton(),
    pipeline_1.pipelineInstance(pipelineTest_1.PipelineTestOnCreate),
    tslib_1.__metadata("design:paramtypes", [])
], Manager);
exports.Manager = Manager;
//# sourceMappingURL=manager.js.map