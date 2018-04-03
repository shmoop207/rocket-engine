"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const index_1 = require("../../../index");
let Controller = class Controller extends index_1.EventDispatcher {
    constructor() {
        super();
    }
    run() {
        this.working = true;
    }
};
tslib_1.__decorate([
    index_1.inject()
], Controller.prototype, "manager", void 0);
tslib_1.__decorate([
    index_1.inject()
], Controller.prototype, "logger2", void 0);
Controller = tslib_1.__decorate([
    index_1.define()
], Controller);
exports.Controller = Controller;
//# sourceMappingURL=controller.js.map