"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidatePipeLine = void 0;
const tslib_1 = require("tslib");
const index_1 = require("../../../../../../index");
let ValidatePipeLine = class ValidatePipeLine {
    run(context, next) {
        context.values.forEach(item => {
            if (item.value > context.metaData.validateNum) {
                context.setArgumentAt(item.index, 0);
            }
        });
        return next();
    }
};
ValidatePipeLine = tslib_1.__decorate([
    index_1.define(),
    index_1.singleton()
], ValidatePipeLine);
exports.ValidatePipeLine = ValidatePipeLine;
//# sourceMappingURL=validate.js.map