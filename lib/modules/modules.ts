"use strict";
import    Q = require('bluebird');
import   _ = require('lodash');
import   path = require('path');
import {Util} from "../util/util";
import {Injector} from "appolo-inject";
import {Module} from "./module";
import {IOptions} from "../interfaces/IOptions";
import {IPlugin} from "../interfaces/IModuleDefinition";
import {ModuleSymbol} from "../decoretors/module";
import {App} from "../app";
import {Events} from "../interfaces/events";
import {ModuleLoader} from "./moduleLoader";

export interface IModuleCrt {
    new(...args: any[]): Module
}

export type ModuleFunction = ((...args: any[]) => void | Promise<any>)

export type ModuleFn = ModuleFunction | IModuleCrt | Module<any>

export class ModuleManager {
    private readonly _modules: ModuleLoader[];

    constructor(private _options: IOptions, private _injector: Injector) {
        this._modules = [];
    }

    public async loadDynamicModules() {

        await Util.runRegroupByParallel<ModuleLoader>(this._modules, loader => loader.module.moduleOptions.parallel, module => this._loadModule(module));
    }

    private async _loadModule(module: ModuleLoader) {
        this._injector.get<App>(App).fireEvent(Events.BeforeModuleInit, module);

        await module.initialize();

        this._injector.get<App>(App).fireEvent(Events.ModuleInit, module);

    }

    private async _registerModule(moduleFn: typeof Module | Module, isParallel: boolean) {


        let module = Module.isPrototypeOf(moduleFn) ? new (moduleFn as typeof Module)() : moduleFn as Module;

        module.moduleOptions.parallel = isParallel;

        let loader = new ModuleLoader(module,this._injector);

        loader.preInitialize();

        if (module.moduleOptions.immediate) {
            await this._loadModule(loader);
        } else {
            this._modules.push(loader);
        }
    }


    public async load(modules: ModuleFn[]): Promise<any> {

        let [dynamicModules, staticModules] = _.partition(modules, module => Reflect.hasMetadata(ModuleSymbol, module) || Reflect.hasMetadata(ModuleSymbol, module.constructor))

        await Q.map(dynamicModules, item => this._registerModule(item as typeof Module | Module, dynamicModules.length > 1));


        await Q.map(staticModules, item => this._loadStaticModule(item as ModuleFunction));


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


