"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const index_1 = require("../../../index");
let Manager2 = class Manager2 extends index_1.EventDispatcher {
    constructor() {
        super();
    }
    run() {
        return this.manager.run();
    }
};
tslib_1.__decorate([
    index_1.inject()
], Manager2.prototype, "manager", void 0);
Manager2 = tslib_1.__decorate([
    index_1.define(),
    index_1.singleton()
], Manager2);
exports.Manager2 = Manager2;
//# sourceMappingURL=manager2.js.map