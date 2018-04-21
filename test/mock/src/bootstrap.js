"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const index_1 = require("../../../index");
let Bootstrap = class Bootstrap {
    async run() {
        this.working = true;
    }
};
tslib_1.__decorate([
    index_1.inject()
], Bootstrap.prototype, "manager", void 0);
Bootstrap = tslib_1.__decorate([
    index_1.define(),
    index_1.singleton(),
    index_1.bootstrap()
], Bootstrap);
exports.Bootstrap = Bootstrap;
//# sourceMappingURL=bootstrap.js.map