"use strict";
var NestedModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NestedModule = void 0;
const tslib_1 = require("tslib");
const index_1 = require("../../../../../index");
const nestedProvider_1 = require("./src/nestedProvider");
let NestedModule = NestedModule_1 = class NestedModule extends index_1.Module {
    static for(options, moduleOptions = {}) {
        return { module: NestedModule_1, options, moduleOptions };
    }
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
NestedModule = NestedModule_1 = tslib_1.__decorate([
    index_1.module()
], NestedModule);
exports.NestedModule = NestedModule;
//# sourceMappingURL=nestedModule.js.map