"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const launcher_1 = require("./launcher/launcher");
class App {
    constructor(options) {
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
    module(moduleFn) {
        return this._moduleManager.load(moduleFn);
    }
    plugin(fn) {
        this._launcher.plugins.push(fn);
    }
    reset() {
        this._injector.reset();
    }
}
exports.App = App;
//# sourceMappingURL=app.js.map