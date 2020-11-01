"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModulesManager = void 0;
const utils_1 = require("@appolo/utils");
const path = require("path");
const app_1 = require("../app/app");
const moduleLoader_1 = require("./moduleLoader");
const inject_1 = require("@appolo/inject");
const util_1 = require("../util/util");
class ModulesManager {
    constructor(_options, _injector) {
        this._options = _options;
        this._injector = _injector;
        this._modules = [];
    }
    get modules() {
        return this._modules;
    }
    async loadDynamicModules() {
        for (let i = 0, len = this._modules.length; i < len; i++) {
            this._modules[i].preInitialize();
        }
        await this._injector.get(app_1.App).event.beforeModulesLoad.fireEventAsync();
        await inject_1.Util.runRegroupByParallel(this._modules, loader => loader.moduleOptions.parallel, module => this._loadModule(module));
        await this._injector.get(app_1.App).event.afterModulesLoaded.fireEventAsync();
    }
    async _loadModule(module) {
        await this._injector.get(app_1.App).event.beforeModuleInitialize.fireEventAsync({ module: module.module });
        await module.initialize();
        await this._injector.get(app_1.App).event.afterModuleInitialize.fireEventAsync({ module: module.module });
    }
    _prepareModuleArgs(modules) {
        let moduleParams = modules.map((item) => {
            let dto;
            if (utils_1.Classes.isClass(item)) {
                dto = { type: item, options: {} };
            }
            else {
                dto = Object.assign({ options: {} }, item);
            }
            return dto;
        });
        return moduleParams;
    }
    register(modules) {
        let moduleParams = this._prepareModuleArgs(modules);
        moduleParams.forEach(item => this._registerModule(item, { parallel: moduleParams.length > 1, immediate: false }));
    }
    _registerModule(moduleParams, moduleOptions) {
        let loader = new moduleLoader_1.ModuleLoader(moduleParams, this._injector, moduleOptions);
        this._modules.push(loader);
    }
    async load(modulesArgs) {
        let moduleParams = this._prepareModuleArgs(modulesArgs);
        let modules = await utils_1.Promises.map(moduleParams, async (moduleParam) => {
            let moduleOptions = { parallel: moduleParams.length > 1, immediate: true };
            let loader = new moduleLoader_1.ModuleLoader(moduleParam, this._injector, moduleOptions);
            loader.preInitialize();
            await this._loadModule(loader);
            return loader.module;
        });
        return modules;
    }
    loadStaticModule(fn) {
        //remove the callback arg
        let args = utils_1.Classes.functionArgsNames(fn), lastArg = args[args.length - 1], isCallback = false;
        if (['callback', 'next', 'fn', 'func'].indexOf(lastArg) > -1) {
            args = args.slice(0, -1);
            isCallback = true;
        }
        let dependencies = args.map((arg) => this._injector.getObject(arg));
        if (isCallback) {
            return utils_1.Promises.fromCallback((callback) => (fn).apply(fn, dependencies.concat([callback])));
        }
        return Promise.resolve().then(() => (fn).apply(fn, dependencies));
    }
    async loadStaticModules() {
        let allPath = path.join(this._options.root, 'config/modules/all.js'), environmentPath = path.join(this._options.root, 'config/modules/', this._options.environment + '.js');
        await util_1.Util.loadPathWithArgs([allPath, environmentPath], this._injector);
    }
    reset() {
        return Promise.all(this._modules.map(module => module.reset()));
    }
    beforeReset() {
        return Promise.all(this._modules.map(module => module.beforeReset()));
    }
}
exports.ModulesManager = ModulesManager;
//# sourceMappingURL=modulesManager.js.map