"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Modules = void 0;
const index_1 = require("@appolo/utils/index");
class Modules {
    constructor(_app, _modulesManager) {
        this._app = _app;
        this._modulesManager = _modulesManager;
    }
    moduleAt(index) {
        let moduleLoader = this._modulesManager.modules[index];
        return moduleLoader ? moduleLoader.module : null;
    }
    modulesByType(type) {
        let modules = this._modulesManager.modules.filter(loader => loader.module.constructor.name === type.name).map(loader => loader.module);
        return modules;
    }
    async loadFn(...fn) {
        await index_1.Promises.map(fn, item => this._modulesManager.loadStaticModule(item));
    }
    use(...module) {
        this._modulesManager.register(module);
        return this;
    }
    async load(...module) {
        let modules = await this._modulesManager.load(module);
        return modules;
    }
}
exports.Modules = Modules;
//# sourceMappingURL=modules.js.map