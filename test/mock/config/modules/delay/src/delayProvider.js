"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Q = require("bluebird");
const index_1 = require("../../../../../../index");
let DelayProvider = class DelayProvider {
    async get() {
        await Q.delay(this.moduleOptions.delay);
        return this.moduleOptions.delay;
    }
};
tslib_1.__decorate([
    index_1.inject()
], DelayProvider.prototype, "delay", void 0);
tslib_1.__decorate([
    index_1.inject()
], DelayProvider.prototype, "moduleOptions", void 0);
DelayProvider = tslib_1.__decorate([
    index_1.define(),
    index_1.singleton(),
    index_1.factory()
], DelayProvider);
exports.DelayProvider = DelayProvider;
//# sourceMappingURL=delayProvider.js.map