"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Test2 = void 0;
const tslib_1 = require("tslib");
const index_1 = require("../../../../../../index");
let Test2 = class Test2 {
    get name() {
        return "working";
    }
};
Test2 = tslib_1.__decorate([
    index_1.define(),
    index_1.singleton()
], Test2);
exports.Test2 = Test2;
//# sourceMappingURL=test.js.map