"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbModule = void 0;
const tslib_1 = require("tslib");
const index_1 = require("../../../../../index");
const dbFactory_1 = require("./src/dbFactory");
const dbManager_1 = require("./src/dbManager");
const nestedProvider_1 = require("../nested/src/nestedProvider");
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
    afterInitialize() {
        let dbManager = this.app.injector.get(dbManager_1.DbManager);
        let isFound = this.app.parent.exported.find(item => item.fn === nestedProvider_1.NestedProvider);
        dbManager.isFoundExportedFile = !!isFound;
    }
};
DbModule = tslib_1.__decorate([
    index_1.module(),
    tslib_1.__metadata("design:paramtypes", [Object])
], DbModule);
exports.DbModule = DbModule;
//# sourceMappingURL=dbModule.js.map