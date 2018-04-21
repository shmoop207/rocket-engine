"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const index_1 = require("../../../../../index");
let Test = class Test {
    get name() {
        return "working";
    }
};
Test = tslib_1.__decorate([
    index_1.define(),
    index_1.singleton()
], Test);
exports.Test = Test;
//# sourceMappingURL=test.js.map