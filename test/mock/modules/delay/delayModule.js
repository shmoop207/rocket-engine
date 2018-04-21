"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const index_1 = require("../../../../index");
const delay_1 = require("./src/delay");
let DelayModule = class DelayModule extends index_1.Module {
    constructor(opts) {
        super(opts);
    }
};
DelayModule = tslib_1.__decorate([
    index_1.module({
        exports: [delay_1.Delay]
    })
], DelayModule);
exports.DelayModule = DelayModule;
//# sourceMappingURL=delayModule.js.map