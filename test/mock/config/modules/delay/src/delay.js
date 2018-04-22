"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const index_1 = require("../../../../../../index");
let Delay = class Delay {
    get name() {
        return "delay" + this.delayManager.name + this.moduleOptions.delay;
    }
};
tslib_1.__decorate([
    index_1.inject()
], Delay.prototype, "delayManager", void 0);
tslib_1.__decorate([
    index_1.inject()
], Delay.prototype, "moduleOptions", void 0);
Delay = tslib_1.__decorate([
    index_1.define(),
    index_1.singleton()
], Delay);
exports.Delay = Delay;
//# sourceMappingURL=delay.js.map