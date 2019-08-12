"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const index_1 = require("../../../../../index");
const nestedProvider_1 = require("./src/nestedProvider");
let NestedModule = class NestedModule extends index_1.Module {
    get exports() {
        return [{ id: this.moduleOptions.id || "nestedProvider", type: nestedProvider_1.NestedProvider }, {
                id: "dbManagerNested",
                type: "dbMock2DbManager"
            }];
    }
    get fileExports() {
        return [nestedProvider_1.NestedProvider];
    }
};
NestedModule = tslib_1.__decorate([
    index_1.module()
], NestedModule);
exports.NestedModule = NestedModule;
//# sourceMappingURL=nestedModule.js.map