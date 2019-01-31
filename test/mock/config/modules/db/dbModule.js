"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const index_1 = require("../../../../../index");
const dbFactory_1 = require("./src/dbFactory");
const dbManager_1 = require("./src/dbManager");
let DbModule = class DbModule extends index_1.Module {
    constructor(opts) {
        super(opts);
    }
    get exports() {
        return [{ id: this.moduleOptions.id, type: dbFactory_1.DbFactory }, {
                id: this.moduleOptions.id + "DbManager",
                type: dbManager_1.DbManager
            }];
    }
    get imports() {
        return [{ id: "env", type: 'env2' }];
    }
};
DbModule = tslib_1.__decorate([
    index_1.module()
], DbModule);
exports.DbModule = DbModule;
//# sourceMappingURL=dbModule.js.map