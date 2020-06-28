"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DelayProvider = void 0;
const tslib_1 = require("tslib");
const appolo_utils_1 = require("appolo-utils");
const index_1 = require("../../../../../../index");
let DelayProvider = class DelayProvider {
    async get() {
        let time = Date.now();
        await appolo_utils_1.Promises.delay(this.moduleOptions.delay);
        return { delay: this.moduleOptions.delay, time: Date.now() - time };
    }
};
tslib_1.__decorate([
    index_1.inject(),
    tslib_1.__metadata("design:type", Object)
], DelayProvider.prototype, "moduleOptions", void 0);
DelayProvider = tslib_1.__decorate([
    index_1.define(),
    index_1.singleton(),
    index_1.factory()
], DelayProvider);
exports.DelayProvider = DelayProvider;
//# sourceMappingURL=delayProvider.js.map