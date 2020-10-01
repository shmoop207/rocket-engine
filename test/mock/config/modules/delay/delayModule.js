"use strict";
var DelayModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DelayModule = void 0;
const tslib_1 = require("tslib");
const index_1 = require("../../../../../index");
const delay_1 = require("./src/delay");
const utils_1 = require("@appolo/utils");
const bootstrap_1 = require("../../../src/bootstrap");
let DelayModule = DelayModule_1 = class DelayModule extends index_1.Module {
    static for(options, moduleOptions = {}) {
        return { module: DelayModule_1, options, moduleOptions };
    }
    get exports() {
        return [{ id: this.moduleOptions.id || "delay", type: delay_1.Delay }];
    }
    beforeLaunch() {
        let isExists = !!this._app.parent.discovery.findByType(bootstrap_1.Bootstrap);
        this.app.parent.eventsInjectRegister.on(payload => {
            if (payload.type == bootstrap_1.Bootstrap && isExists && !this._app.parent.injector.getInstance("exportedClassEvent")) {
                this._app.parent.injector.addInstance("exportedClassEvent", true);
            }
        });
        this.app.eventsBeforeReset.on(async () => {
            await utils_1.Promises.delay(1);
            this.app.parent["resetTestEvent"] = true;
        }, this, { await: true });
    }
    beforeReset() {
        this.app.parent["resetTest"] = true;
    }
};
DelayModule = DelayModule_1 = tslib_1.__decorate([
    index_1.module({ exports: [] })
], DelayModule);
exports.DelayModule = DelayModule;
//# sourceMappingURL=delayModule.js.map