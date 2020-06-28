"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bootstrap = void 0;
const tslib_1 = require("tslib");
const index_1 = require("../../../../../../index");
let Bootstrap = class Bootstrap {
    async run() {
        this.dbFactory.bootstrapDecorator = true;
    }
};
tslib_1.__decorate([
    index_1.inject(),
    tslib_1.__metadata("design:type", Object)
], Bootstrap.prototype, "moduleOptions", void 0);
tslib_1.__decorate([
    index_1.inject(),
    tslib_1.__metadata("design:type", Object)
], Bootstrap.prototype, "dbFactory", void 0);
Bootstrap = tslib_1.__decorate([
    index_1.define(),
    index_1.singleton(),
    index_1.bootstrap()
], Bootstrap);
exports.Bootstrap = Bootstrap;
//# sourceMappingURL=boostrap.js.map