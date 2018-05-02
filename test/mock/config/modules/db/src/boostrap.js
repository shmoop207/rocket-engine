"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const index_1 = require("../../../../../../index");
let Boostrap = class Boostrap {
    async run() {
        return this.moduleOptions.id;
    }
};
tslib_1.__decorate([
    index_1.inject()
], Boostrap.prototype, "moduleOptions", void 0);
Boostrap = tslib_1.__decorate([
    index_1.define(),
    index_1.singleton(),
    index_1.bootstrap()
], Boostrap);
exports.Boostrap = Boostrap;
//# sourceMappingURL=boostrap.js.map