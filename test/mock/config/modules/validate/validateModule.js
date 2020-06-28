"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateModule = exports.validate = void 0;
const tslib_1 = require("tslib");
const index_1 = require("../../../../../index");
const validate_1 = require("./src/validate");
function validate(num) {
    return function (fn, propertyName, index) {
        index_1.pipeline(validate_1.ValidatePipeLine, { validateNum: num })(fn, propertyName, index);
    };
}
exports.validate = validate;
let ValidateModule = class ValidateModule extends index_1.Module {
    get exports() {
        return [validate_1.ValidatePipeLine];
    }
};
ValidateModule = tslib_1.__decorate([
    index_1.module({ immediate: true })
], ValidateModule);
exports.ValidateModule = ValidateModule;
//# sourceMappingURL=validateModule.js.map