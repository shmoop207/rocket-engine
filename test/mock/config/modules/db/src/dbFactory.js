"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Q = require("bluebird");
const index_1 = require("../../../../../../index");
let DbFactory = class DbFactory {
    async get() {
        await Q.delay(1);
        return { conn: "working", env: this.env2.type };
    }
};
tslib_1.__decorate([
    index_1.inject()
], DbFactory.prototype, "moduleOptions", void 0);
tslib_1.__decorate([
    index_1.inject()
], DbFactory.prototype, "env2", void 0);
DbFactory = tslib_1.__decorate([
    index_1.define(),
    index_1.singleton(),
    index_1.factory()
], DbFactory);
exports.DbFactory = DbFactory;
//# sourceMappingURL=dbFactory.js.map