"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const launcher_1 = require("./launcher/launcher");
const Q = require("bluebird");
class App {
    constructor(options) {
        this._children = [];
        this._launcher = new launcher_1.Launcher();
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
    async launch() {
        await this._launcher.launch();
        if (this.parent) {
            return;
        }
        for (let app of this._children) {
            await app._launcher.initInjector();
        }
        await this._launcher.initInjector();
        for (let app of this._children) {
            await app._launcher.loadBootStrap();
        }
        await this._launcher.loadBootStrap();
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
    async module(...moduleFn) {
        await Q.map(moduleFn, module => this._moduleManager.load(module));
    }
    plugin(fn) {
        this._launcher.plugins.push(fn);
    }
    reset() {
        this._injector.reset();
    }
    get parent() {
        return this._parent;
    }
    get children() {
        return this._children;
    }
    set parent(value) {
        this._parent = value;
        value.children.push(this);
    }
}
exports.App = App;
//# sourceMappingURL=app.js.map