"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Events = void 0;
const events_1 = require("@appolo/events");
class Events {
    constructor(_app) {
        this._app = _app;
        this.onModuleExport = new events_1.Event();
        this.beforeModuleInitialize = new events_1.Event();
        this.afterModuleInitialize = new events_1.Event();
        this.beforeModulesLoad = new events_1.Event();
        this.afterModulesLoaded = new events_1.Event();
        this.beforeInjectorInitialize = new events_1.Event();
        this.afterInjectorInitialize = new events_1.Event();
        this.beforeBootstrap = new events_1.Event();
        this.afterBootstrap = new events_1.Event();
        this.afterLaunch = new events_1.Event();
        this.beforeInjectRegister = new events_1.Event();
        this.onClassExport = new events_1.Event();
        this.afterInjectRegister = new events_1.Event();
        this.beforeReset = new events_1.Event();
        this.afterReset = new events_1.Event();
    }
    get onOwnInstanceInitialized() {
        return this._app.injector.events.instanceOwnInitialized;
    }
    get onInstanceInitialized() {
        return this._app.injector.events.instanceInitialized;
    }
    get onOwnInstanceCreated() {
        return this._app.injector.events.instanceOwnCreated;
    }
    get onInstanceCreated() {
        return this._app.injector.events.instanceCreated;
    }
}
exports.Events = Events;
//# sourceMappingURL=events.js.map