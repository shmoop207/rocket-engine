"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Manager = void 0;
const tslib_1 = require("tslib");
const pipelineTest_1 = require("./pipelineTest");
const pipelineDecorators_1 = require("../../../lib/decoretors/pipelineDecorators");
const inject_1 = require("@appolo/inject");
const events_1 = require("@appolo/events");
let Manager = class Manager extends events_1.EventDispatcher {
    constructor() {
        super();
    }
    run() {
        this.working = true;
        return true;
    }
};
Manager = tslib_1.__decorate([
    inject_1.define(),
    inject_1.singleton(),
    pipelineDecorators_1.pipelineInstance(pipelineTest_1.PipelineTestOnCreate),
    tslib_1.__metadata("design:paramtypes", [])
], Manager);
exports.Manager = Manager;
//# sourceMappingURL=manager.js.map