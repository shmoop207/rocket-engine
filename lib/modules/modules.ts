"use strict";
import    Q = require('bluebird');
import   _ = require('lodash');
import {Util} from "../util/util";
import {App} from "../app";
import {Injector, createContainer} from "rocket-inject";
import {Module} from "./module";
import {ModuleSymbol} from "../decorators";


export type ModuleFn = (...args: any[]) => void | Promise<any>

export class ModuleManager {
    private _modules: (typeof Module | Module)[];
    //private _isModulesLoaded: boolean;

    constructor(private app:App) {
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

    public  load(moduleFn: ModuleFn| typeof Module | Module): PromiseLike<any> {
        if(moduleFn instanceof Module || Reflect.hasMetadata(ModuleSymbol,moduleFn)){
            this._modules.push(moduleFn as Module);
            return;
        }

        //remove the callback arg
        let args = Util.getFunctionArgs(moduleFn as ModuleFn),
            lastArg = _.last(args),
            isCallback = false;

        if (_.includes(['callback', 'next', 'fn', 'func'], lastArg)) {
            args = _.initial(args);
            isCallback = true;
        }

        let dependencies = _.map(args, (arg: string) => this.app.injector.getObject(arg));

        if (isCallback) {
            return Q.fromCallback((callback) => (moduleFn as ModuleFn).apply(moduleFn, dependencies.concat([callback])));
        }

        return Q.try(() => (moduleFn as ModuleFn).apply(moduleFn, dependencies))
    }

    // public  load(fn: ModuleFn,): PromiseLike<any> {
    //     return this._createModuleCallback(fn);
    // }

    // public reset() {
    //     this._modules.length = 0;
    // }
}


