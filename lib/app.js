"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const rocket_inject_1 = require("rocket-inject");
const launcher_1 = require("./launcher/launcher");
const modules_1 = require("./modules/modules");
class App {
    constructor(options) {
        this._options = launcher_1.Launcher.loadOptions(options);
        this._moduleManager = new modules_1.ModuleManager(this);
        this._env = launcher_1.Launcher.loadEnvironments(this._options);
        this._injector = rocket_inject_1.createContainer();
        this._loadInject();
    }
    static create(options) {
        return new App(options);
    }
    ;
    _loadInject() {
        this._injector.addObject("environment", this._env);
        this._injector.addObject("env", this._env);
        this._injector.addObject("inject", this._injector);
        this._injector.addObject("injector", this._injector);
        this._injector.addObject("app", this);
    }
    launch() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this._launcher = new launcher_1.Launcher(this);
            yield this._launcher.launch();
            return this;
        });
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
    module(moduleFn) {
        return this._moduleManager.load(moduleFn, this.injector);
    }
}
exports.App = App;
//# sourceMappingURL=app.js.map