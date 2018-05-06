"use strict";
import    Q = require('bluebird');
import   _ = require('lodash');
import   path = require('path');
import {Util} from "../util/util";
import {Injector} from "appolo-inject";
import {Module} from "./module";
import {ModuleSymbol} from "../decorators";
import {IOptions} from "../interfaces/IOptions";
import {IModuleDefinition, IPlugin} from "../interfaces/IModuleDefinition";

export interface IModuleCrt {
    new(...args: any[]): Module
}

export type ModuleFunction = ((...args: any[]) => void | Promise<any>)

export type ModuleFn = ModuleFunction | IModuleCrt | Module<any>

export class ModuleManager {
    private readonly _modules: Module[];

    constructor(private _options: IOptions, private _injector: Injector, private plugins: IPlugin[]) {
        this._modules = [];

    }

    public async loadDynamicModules() {

        for (let module of this._modules) {
            await this._loadModule(module)
        }
    }

    private async _loadModule(module: Module) {

        await module.initialize(this._injector, this.plugins);
    }

    public async _loadDynamicModule(moduleFn: typeof Module | Module) {


        let module = Module.isPrototypeOf(moduleFn) ? new (moduleFn as typeof Module)() : moduleFn as Module;

        let def: IModuleDefinition = Reflect.getMetadata(ModuleSymbol, module.constructor);

        if (def.immediate) {
            await this._loadModule(module);
        } else {
            this._modules.push(module);
        }
    }


    public async load(moduleFn: ModuleFn): Promise<any> {

        if (Reflect.hasMetadata(ModuleSymbol, moduleFn) || Reflect.hasMetadata(ModuleSymbol, moduleFn.constructor)) {
            await this._loadDynamicModule(moduleFn as (typeof Module | Module));

        } else {
            await this._loadStaticModule(moduleFn as ModuleFunction)
        }
    }

    private _loadStaticModule(moduleFn: ModuleFunction): PromiseLike<any> {
        //remove the callback arg
        let args = Util.getFunctionArgs(moduleFn as ModuleFunction),
            lastArg = _.last(args),
            isCallback = false;

        if (_.includes(['callback', 'next', 'fn', 'func'], lastArg)) {
            args = _.initial(args);
            isCallback = true;
        }

        let dependencies = _.map(args, (arg: string) => this._injector.getObject(arg));

        if (isCallback) {
            return Q.fromCallback((callback) => (moduleFn as ModuleFunction).apply(moduleFn, dependencies.concat([callback])));
        }

        return Q.try(() => (moduleFn as ModuleFunction).apply(moduleFn, dependencies))
    }

    public async loadStaticModules(): Promise<void> {


        let allPath = path.join(this._options.root, 'config/modules/all.js'),
            environmentPath = path.join(this._options.root, 'config/modules/', this._options.environment + '.js');


        await Util.loadPathWithArgs([allPath, environmentPath], this._injector)
    }


}


