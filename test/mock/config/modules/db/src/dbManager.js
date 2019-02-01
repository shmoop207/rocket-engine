"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const index_1 = require("../../../../../../index");
let DbManager = class DbManager {
    get db() {
        return this.dbFactory;
    }
};
tslib_1.__decorate([
    index_1.inject()
], DbManager.prototype, "dbFactory", void 0);
tslib_1.__decorate([
    index_1.inject()
], DbManager.prototype, "env2", void 0);
tslib_1.__decorate([
    index_1.inject()
], DbManager.prototype, "test", void 0);
DbManager = tslib_1.__decorate([
    index_1.define(),
    index_1.singleton()
], DbManager);
exports.DbManager = DbManager;
//# sourceMappingURL=dbManager.js.map