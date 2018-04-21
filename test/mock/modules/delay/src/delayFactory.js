"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Q = require("bluebird");
const index_1 = require("../../../../../index");
let DelayFactory = class DelayFactory {
    async get() {
        await Q.delay(this.moduleOptions.delay);
        return this.test;
    }
};
tslib_1.__decorate([
    index_1.inject()
], DelayFactory.prototype, "test", void 0);
tslib_1.__decorate([
    index_1.inject()
], DelayFactory.prototype, "moduleOptions", void 0);
DelayFactory = tslib_1.__decorate([
    index_1.define(),
    index_1.singleton(),
    index_1.factory()
], DelayFactory);
exports.DelayFactory = DelayFactory;
//# sourceMappingURL=delayFactory.js.map