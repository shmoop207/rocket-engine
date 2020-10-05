"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Events = void 0;
const events_1 = require("@appolo/events");
class Events {
    constructor(_app) {
        this._app = _app;
        this.moduleExport = new events_1.Event();
        this.beforeModuleInit = new events_1.Event();
        this.moduleInit = new events_1.Event();
        this.beforeModulesLoad = new events_1.Event();
        this.modulesLoaded = new events_1.Event();
        this.beforeInjectorInit = new events_1.Event();
        this.injectorInit = new events_1.Event();
        this.beforeBootstrap = new events_1.Event();
        this.bootstrap = new events_1.Event();
        this.beforeInjectRegister = new events_1.Event();
        this.classExport = new events_1.Event();
        this.injectRegister = new events_1.Event();
        this.beforeReset = new events_1.Event();
        this.reset = new events_1.Event();
    }
    get instanceOwnInitialized() {
        return this._app.injector.events.instanceOwnInitialized;
    }
    get instanceInitialized() {
        return this._app.injector.events.instanceInitialized;
    }
    get instanceOwnCreated() {
        return this._app.injector.events.instanceOwnCreated;
    }
    get instanceCreated() {
        return this._app.injector.events.instanceCreated;
    }
}
exports.Events = Events;
//# sourceMappingURL=events.js.map