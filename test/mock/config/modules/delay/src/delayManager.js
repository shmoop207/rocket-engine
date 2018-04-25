"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const index_1 = require("../../../../../../index");
let DelayManager = class DelayManager {
    get name() {
        return this.delayProvider + this.env.type;
    }
};
tslib_1.__decorate([
    index_1.inject()
], DelayManager.prototype, "env", void 0);
tslib_1.__decorate([
    index_1.inject()
], DelayManager.prototype, "delayProvider", void 0);
DelayManager = tslib_1.__decorate([
    index_1.define(),
    index_1.singleton()
], DelayManager);
exports.DelayManager = DelayManager;
//# sourceMappingURL=delayManager.js.map