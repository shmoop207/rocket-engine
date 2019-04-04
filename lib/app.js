"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const launcher_1 = require("./launcher/launcher");
const appolo_event_dispatcher_1 = require("appolo-event-dispatcher");
const events_1 = require("./interfaces/events");
const _ = require("lodash");
class App extends appolo_event_dispatcher_1.EventDispatcher {
    constructor(options) {
        super();
        this._children = [];
        this._launcher = new launcher_1.Launcher(this);
        this._options = this._launcher.loadOptions(options);
        this._env = this._launcher.loadEnvironments();
        this._injector = this._launcher.loadInject();
        this._injector.addObject("app", this);
        this._moduleManager = this._launcher.createModuleManager();
    }
    static create(options) {
        return new App(options);
    }
    ;
    get launcher() {
        return this._launcher;
    }
    async launch() {
        await this._launcher.launch();
        return this;
    }
    get env() {
        return this._env;
    }
    get options() {
        return this._options;
    }
    get injector() {
        return this._injector;
    }
    register(id, type) {
        return this._injector.register(id, type);
    }
    async module(...modules) {
        await this._moduleManager.load(modules);
    }
    get parent() {
        return this._parent;
    }
    get root() {
        if (this._root) {
            return this._root;
        }
        let parent = this.parent;
        while (parent.parent != null) {
            parent = parent.parent;
        }
        this._root = parent;
        return parent;
    }
    get children() {
        return this._children;
    }
    set parent(value) {
        this._parent = value;
        value.children.push(this);
    }
    get exportedClasses() {
        return this.exported;
    }
    get exported() {
        return this._launcher.exported;
    }
    reset() {
        this.fireEvent(events_1.Events.BeforeReset);
        _.forEach(this._children, app => app.reset());
        this._injector.reset();
        this._children.length = 0;
        this._parent = null;
        this._injector = null;
        this._launcher.reset();
        this.fireEvent(events_1.Events.Reset);
    }
    on(event, fn, scope, options) {
        return super.on(event.toString(), fn, scope, options);
    }
    once(event, fn, scope) {
        return super.once(event.toString(), fn, scope);
    }
}
exports.App = App;
//# sourceMappingURL=app.js.map