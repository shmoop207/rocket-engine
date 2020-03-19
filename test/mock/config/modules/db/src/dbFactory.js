"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const appolo_utils_1 = require("appolo-utils");
const index_1 = require("../../../../../../index");
const test_1 = require("../../test/src/test");
let DbFactory = class DbFactory {
    async get() {
        await appolo_utils_1.Promises.delay(1);
        return { conn: "working", env: this.env2.type, name: this.test.name, time: Date.now() };
    }
};
tslib_1.__decorate([
    index_1.inject(),
    tslib_1.__metadata("design:type", Object)
], DbFactory.prototype, "moduleOptions", void 0);
tslib_1.__decorate([
    index_1.inject(),
    tslib_1.__metadata("design:type", Object)
], DbFactory.prototype, "env2", void 0);
tslib_1.__decorate([
    index_1.inject(),
    tslib_1.__metadata("design:type", test_1.Test)
], DbFactory.prototype, "test", void 0);
DbFactory = tslib_1.__decorate([
    index_1.define(),
    index_1.singleton(),
    index_1.factory()
], DbFactory);
exports.DbFactory = DbFactory;
//# sourceMappingURL=dbFactory.js.map