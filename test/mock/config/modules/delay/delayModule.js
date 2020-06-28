"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DelayModule = void 0;
const tslib_1 = require("tslib");
const index_1 = require("../../../../../index");
const delay_1 = require("./src/delay");
const bootstrap_1 = require("../../../src/bootstrap");
let DelayModule = class DelayModule extends index_1.Module {
    get exports() {
        return [{ id: this.moduleOptions.id || "delay", type: delay_1.Delay }];
    }
    beforeLaunch() {
        this._app.on(index_1.Events.ClassExport, (fn, path) => {
            if (fn === bootstrap_1.Bootstrap && !this._app.parent.injector.getInstance("exportedClassEvent")) {
                this._app.parent.injector.addInstance("exportedClassEvent", true);
            }
        });
    }
};
DelayModule = tslib_1.__decorate([
    index_1.module({ exports: [] })
], DelayModule);
exports.DelayModule = DelayModule;
//# sourceMappingURL=delayModule.js.map