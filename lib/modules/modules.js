"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Q = require("bluebird");
const _ = require("lodash");
const path = require("path");
const util_1 = require("../util/util");
const module_1 = require("./module");
const module_2 = require("../decoretors/module");
const app_1 = require("../app");
const events_1 = require("../interfaces/events");
class ModuleManager {
    constructor(_options, _injector) {
        this._options = _options;
        this._injector = _injector;
        this._modules = [];
    }
    async loadDynamicModules() {
        await util_1.Util.runRegroupByParallel(this._modules, module => module.moduleOptions.parallel, module => this._loadModule(module));
    }
    async _loadModule(module) {
        this._injector.get(app_1.App).fireEvent(events_1.Events.BeforeModuleInit, module);
        await module.initialize(this._injector);
        this._injector.get(app_1.App).fireEvent(events_1.Events.ModuleInit, module);
    }
    async _loadDynamicModule(moduleFn, isParallel) {
        let module = module_1.Module.isPrototypeOf(moduleFn) ? new moduleFn() : moduleFn;
        module.moduleOptions.parallel = isParallel;
        if (module.moduleOptions.immediate) {
            await this._loadModule(module);
        }
        else {
            this._modules.push(module);
        }
    }
    async load(modules) {
        let [dynamicModules, staticModules] = _.partition(modules, module => Reflect.hasMetadata(module_2.ModuleSymbol, module) || Reflect.hasMetadata(module_2.ModuleSymbol, module.constructor));
        await Q.map(dynamicModules, item => this._loadDynamicModule(item, dynamicModules.length > 1));
        await Q.map(staticModules, item => this._loadStaticModule(item));
    }
    _loadStaticModule(moduleFn) {
        //remove the callback arg
        let args = util_1.Util.getFunctionArgs(moduleFn), lastArg = _.last(args), isCallback = false;
        if (_.includes(['callback', 'next', 'fn', 'func'], lastArg)) {
            args = _.initial(args);
            isCallback = true;
        }
        let dependencies = _.map(args, (arg) => this._injector.getObject(arg));
        if (isCallback) {
            return Q.fromCallback((callback) => moduleFn.apply(moduleFn, dependencies.concat([callback])));
        }
        return Q.try(() => moduleFn.apply(moduleFn, dependencies));
    }
    async loadStaticModules() {
        let allPath = path.join(this._options.root, 'config/modules/all.js'), environmentPath = path.join(this._options.root, 'config/modules/', this._options.environment + '.js');
        await util_1.Util.loadPathWithArgs([allPath, environmentPath], this._injector);
    }
}
exports.ModuleManager = ModuleManager;
//# sourceMappingURL=modules.js.map