"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const index_1 = require("../../../../../../index");
const validateModule_1 = require("../../validate/validateModule");
class BaseController extends index_1.EventDispatcher {
    async validateBase(value, value2) {
        return value + value2;
    }
}
tslib_1.__decorate([
    tslib_1.__param(0, validateModule_1.validate(5)), tslib_1.__param(1, validateModule_1.validate(6)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], BaseController.prototype, "validateBase", null);
exports.BaseController = BaseController;
//# sourceMappingURL=baseController.js.map