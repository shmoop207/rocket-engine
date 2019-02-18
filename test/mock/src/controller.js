"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const index_1 = require("../../../index");
const beforeTest_1 = require("./beforeTest");
let Controller = class Controller extends index_1.EventDispatcher {
    constructor() {
        super();
    }
    run() {
        this.working = true;
    }
    async testBefore(num) {
        return num + 1;
    }
    async testAfter(num) {
        return num + 1;
    }
};
tslib_1.__decorate([
    index_1.inject()
], Controller.prototype, "manager", void 0);
tslib_1.__decorate([
    index_1.inject()
], Controller.prototype, "logger2", void 0);
tslib_1.__decorate([
    index_1.before(beforeTest_1.BeforeTest, c => c.run)
], Controller.prototype, "testBefore", null);
tslib_1.__decorate([
    index_1.after(beforeTest_1.BeforeTest, c => c.runAfter)
], Controller.prototype, "testAfter", null);
Controller = tslib_1.__decorate([
    index_1.define()
], Controller);
exports.Controller = Controller;
//# sourceMappingURL=controller.js.map