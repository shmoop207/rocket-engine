"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Delay = void 0;
const tslib_1 = require("tslib");
const index_1 = require("../../../../../../index");
const delayManager_1 = require("./delayManager");
let Delay = class Delay {
    get data() {
        return { time: this.delayManager.time, msg: this.moduleOptions.testModule };
    }
};
tslib_1.__decorate([
    index_1.inject(),
    tslib_1.__metadata("design:type", delayManager_1.DelayManager)
], Delay.prototype, "delayManager", void 0);
tslib_1.__decorate([
    index_1.inject(),
    tslib_1.__metadata("design:type", Object)
], Delay.prototype, "moduleOptions", void 0);
Delay = tslib_1.__decorate([
    index_1.define(),
    index_1.singleton()
], Delay);
exports.Delay = Delay;
//# sourceMappingURL=delay.js.map