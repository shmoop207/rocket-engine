"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NestedProvider = void 0;
const tslib_1 = require("tslib");
const index_1 = require("../../../../../../index");
let NestedProvider = class NestedProvider {
    async get() {
        //await Q.delay(this.moduleOptions.delay);
        return { dbMock2: this.dbMock2DbManager, delay: this.moduleOptions.delay, time: Date.now() };
    }
};
tslib_1.__decorate([
    index_1.inject(),
    tslib_1.__metadata("design:type", Object)
], NestedProvider.prototype, "dbMock2DbManager", void 0);
tslib_1.__decorate([
    index_1.inject(),
    tslib_1.__metadata("design:type", Object)
], NestedProvider.prototype, "moduleOptions", void 0);
NestedProvider = tslib_1.__decorate([
    index_1.define(),
    index_1.singleton(),
    index_1.factory()
], NestedProvider);
exports.NestedProvider = NestedProvider;
//# sourceMappingURL=nestedProvider.js.map