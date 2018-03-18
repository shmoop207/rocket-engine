"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const index_1 = require("../../../index");
let Manager = class Manager extends index_1.EventDispatcher {
    constructor() {
        super();
    }
    run() {
        this.working = true;
        return true;
    }
};
Manager = tslib_1.__decorate([
    index_1.define(),
    index_1.singleton()
], Manager);
exports.Manager = Manager;
//# sourceMappingURL=manager.js.map