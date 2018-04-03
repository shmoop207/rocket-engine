"use strict";
import    Q = require('bluebird');
import   _ = require('lodash');
import {Util} from "../util/util";
import {App} from "../app";
import {Injector, createContainer} from "rocket-inject";
import {Module} from "./module";
import {ModuleSymbol} from "../decorators";
import {IOptions} from "../IOptions";
import   path = require('path');
import   fs = require('fs');
import {AppModule} from "./appModule";


export type ModuleFn = (...args: any[]) => void | Promise<any>

export class ModuleManager {
    private _modules: (typeof Module | Module)[];

    constructor(private _options: IOptions, private _injector: Injector) {
        this._modules = [];

    }

    public async loadDynamicModules() {

        let appModule = new AppModule(this._injector, this._modules as Module[]);

        await appModule.initialize()
    }

    public load(moduleFn: ModuleFn | typeof Module | Module): PromiseLike<any> {
        if (moduleFn instanceof Module || Reflect.hasMetadata(ModuleSymbol, moduleFn)) {
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

        let dependencies = _.map(args, (arg: string) => this._injector.getObject(arg));

        if (isCallback) {
            return Q.fromCallback((callback) => (moduleFn as ModuleFn).apply(moduleFn, dependencies.concat([callback])));
        }

        return Q.try(() => (moduleFn as ModuleFn).apply(moduleFn, dependencies))
    }

    public async loadStaticModules(): Promise<void> {
        let modulesPath = path.join(this._options.root, 'modules/modules.js');

        await Util.loadPathWithArgs([modulesPath], this._injector)
    }


}


