"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const index_1 = require("../../../../../../index");
let ValidatePipeLine = class ValidatePipeLine {
    run(context, next) {
        let index = 0;
        if (context.index >= 0) {
            index = context.index;
        }
        if (context.args[index] > context.metaData.validateNum) {
            context.args[index] = 0;
        }
        return next();
    }
};
ValidatePipeLine = tslib_1.__decorate([
    index_1.define(),
    index_1.singleton()
], ValidatePipeLine);
exports.ValidatePipeLine = ValidatePipeLine;
//# sourceMappingURL=validate.js.map