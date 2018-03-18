"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Q = require("bluebird");
const _ = require("lodash");
const util_1 = require("../util/util");
const module_1 = require("./module");
const decorators_1 = require("../decorators");
class ModuleManager {
    //private _isModulesLoaded: boolean;
    constructor(app) {
        this.app = app;
        this._modules = [];
    }
    // public register(func: ModuleFn, async: boolean = false) {
    //
    //     this._modules.push({fn: func, async: async})
    // }
    // public async initialize(): Promise<void> {
    //
    //     await this._runModules(this._modules.slice())
    // }
    // private async _runModules(modules: { fn: ModuleFn, async: boolean }[]) {
    //
    //     if (!modules || modules.length <= 0) {
    //         return;
    //     }
    //
    //     let asyncModules = [], syncModules = [], isAsyncMode = modules[0].async;
    //
    //     while (modules.length) {
    //         let module = modules[0];
    //
    //         if (module.async != isAsyncMode) {
    //             break;
    //         }
    //
    //         isAsyncMode ? asyncModules.push(module.fn) : syncModules.push(module.fn);
    //         modules.shift();
    //     }
    //
    //
    //     await (isAsyncMode ? this._runAsyncModules(asyncModules) : this._runSyncModules(syncModules));
    //
    //     await this._runModules(modules);
    //
    // }
    // private async _runAsyncModules(modules: ModuleFn[]) {
    //     await Q.map(modules, moduleFn => this._createModuleCallback(moduleFn))
    // }
    //
    // private async _runSyncModules(modules: ModuleFn[]) {
    //     for (let moduleFn of modules) {
    //         await this._createModuleCallback(moduleFn)
    //     }
    // }
    load(moduleFn) {
        if (moduleFn instanceof module_1.Module || Reflect.hasMetadata(decorators_1.ModuleSymbol, moduleFn)) {
            this._modules.push(moduleFn);
            return;
        }
        //remove the callback arg
        let args = util_1.Util.getFunctionArgs(moduleFn), lastArg = _.last(args), isCallback = false;
        if (_.includes(['callback', 'next', 'fn', 'func'], lastArg)) {
            args = _.initial(args);
            isCallback = true;
        }
        let dependencies = _.map(args, (arg) => this.app.injector.getObject(arg));
        if (isCallback) {
            return Q.fromCallback((callback) => moduleFn.apply(moduleFn, dependencies.concat([callback])));
        }
        return Q.try(() => moduleFn.apply(moduleFn, dependencies));
    }
}
exports.ModuleManager = ModuleManager;
//# sourceMappingURL=modules.js.map