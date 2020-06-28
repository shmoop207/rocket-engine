"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseModuleClassModule = void 0;
const tslib_1 = require("tslib");
const index_1 = require("../../../../../index");
let BaseModuleClassModule = class BaseModuleClassModule extends index_1.Module {
    get exports() {
        return [];
    }
};
BaseModuleClassModule = tslib_1.__decorate([
    index_1.module({ immediate: true })
], BaseModuleClassModule);
exports.BaseModuleClassModule = BaseModuleClassModule;
//# sourceMappingURL=baseModuleClassModule.js.map