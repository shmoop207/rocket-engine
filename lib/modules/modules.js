"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModuleManager = void 0;
const utils_1 = require("@appolo/utils");
const path = require("path");
const app_1 = require("../app");
const moduleLoader_1 = require("./moduleLoader");
const inject_1 = require("@appolo/inject");
const util_1 = require("../util/util");
class ModuleManager {
    constructor(_options, _injector) {
        this._options = _options;
        this._injector = _injector;
        this._modules = [];
    }
    moduleAt(index) {
        let moduleLoader = this._modules[index];
        return moduleLoader ? moduleLoader.module : null;
    }
    moduleByType(type) {
        let modules = this._modules.filter(loader => loader.module.constructor.name === type.name).map(loader => loader.module);
        return modules;
    }
    async loadDynamicModules() {
        for (let i = 0, len = this._modules.length; i < len; i++) {
            this._modules[i].preInitialize();
        }
        await inject_1.Util.runRegroupByParallel(this._modules, loader => loader.moduleOptions.parallel, module => this._loadModule(module));
    }
    async initAfterInjectDynamicModules() {
        await inject_1.Util.runRegroupByParallel(this._modules, loader => loader.moduleOptions.parallel, module => module.afterLaunch());
    }
    async _loadModule(module) {
        this._injector.get(app_1.App).eventBeforeModuleInit.fireEvent({ module: module.module });
        await module.initialize();
        this._injector.get(app_1.App).eventModuleInit.fireEvent({ module: module.module });
    }
    async _registerModule(moduleParams, isParallel) {
        moduleParams.parallel = isParallel;
        let loader = new moduleLoader_1.ModuleLoader(moduleParams, this._injector);
        if (moduleParams.immediate) {
            loader.preInitialize();
            await this._loadModule(loader);
        }
        else {
            this._modules.push(loader);
        }
    }
    async load(modules) {
        let moduleParams = modules.map((item) => {
            let dto;
            if (Array.isArray(item)) {
                if (utils_1.Classes.isClass(item[0])) {
                    item = Object.assign({ type: item[0], config: item[1] }, item[2]);
                }
                else {
                    item = item[0];
                }
            }
            if (utils_1.Classes.isClass(item)) {
                dto = { type: item, config: {} };
            }
            else if (utils_1.Functions.isFunction(item)) {
                dto = { fn: item, config: {} };
            }
            else {
                dto = Object.assign({ config: {} }, item);
            }
            return dto;
        });
        let [dynamicModules, staticModules] = utils_1.Arrays.partition(moduleParams, module => !!module.type);
        await utils_1.Promises.map(dynamicModules, item => this._registerModule(item, dynamicModules.length > 1));
        await utils_1.Promises.map(staticModules, item => this._loadStaticModule(item));
    }
    _loadStaticModule(moduleParams) {
        //remove the callback arg
        let args = utils_1.Classes.functionArgsNames(moduleParams.fn), lastArg = args[args.length - 1], isCallback = false;
        if (['callback', 'next', 'fn', 'func'].indexOf(lastArg) > -1) {
            args = args.slice(0, -1);
            isCallback = true;
        }
        let dependencies = args.map((arg) => this._injector.getObject(arg));
        if (isCallback) {
            return utils_1.Promises.fromCallback((callback) => (moduleParams.fn).apply(moduleParams.fn, dependencies.concat([callback])));
        }
        return Promise.resolve().then(() => (moduleParams.fn).apply(moduleParams.fn, dependencies));
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
exports.ModuleManager = ModuleManager;
//# sourceMappingURL=modules.js.map