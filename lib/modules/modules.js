"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Q = require("bluebird");
const _ = require("lodash");
const path = require("path");
const util_1 = require("../util/util");
const module_1 = require("./module");
const decorators_1 = require("../decorators");
class ModuleManager {
    constructor(_options, _injector, plugins) {
        this._options = _options;
        this._injector = _injector;
        this.plugins = plugins;
        this._modules = [];
    }
    async loadDynamicModules() {
        for (let module of this._modules) {
            await this._loadModule(module);
        }
    }
    async _loadModule(module) {
        await module.initialize(this._injector, this.plugins);
    }
    async _loadDynamicModule(moduleFn) {
        let module = module_1.Module.isPrototypeOf(moduleFn) ? new moduleFn() : moduleFn;
        let def = Reflect.getMetadata(decorators_1.ModuleSymbol, module.constructor);
        if (def.immediate) {
            await this._loadModule(module);
        }
        else {
            this._modules.push(module);
        }
    }
    async load(moduleFn) {
        if (Reflect.hasMetadata(decorators_1.ModuleSymbol, moduleFn) || Reflect.hasMetadata(decorators_1.ModuleSymbol, moduleFn.constructor)) {
            await this._loadDynamicModule(moduleFn);
        }
        else {
            await this._loadStaticModule(moduleFn);
        }
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