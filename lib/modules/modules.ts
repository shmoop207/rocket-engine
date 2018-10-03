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

        await Util.runRegroupByParallel<Module>(this._modules, module => module.moduleOptions.parallel, module => this._loadModule(module));
    }

    private async _loadModule(module: Module) {
        this._injector.get<App>(App).fireEvent(Events.BeforeModuleInit, module);

        await module.initialize(this._injector, this.plugins);

        this._injector.get<App>(App).fireEvent(Events.ModuleInit, module);

    }

    public async _loadDynamicModule(moduleFn: typeof Module | Module, isParallel: boolean) {


        let module = Module.isPrototypeOf(moduleFn) ? new (moduleFn as typeof Module)() : moduleFn as Module;

        module.moduleOptions.parallel = isParallel;

        if (module.moduleOptions.immediate) {
            await this._loadModule(module);
        } else {
            this._modules.push(module);
        }
    }


    public async load(modules: ModuleFn[]): Promise<any> {

        let [dynamicModules, staticModules] = _.partition(modules, module => Reflect.hasMetadata(ModuleSymbol, module) || Reflect.hasMetadata(ModuleSymbol, module.constructor))

        await Q.map(dynamicModules, item => this._loadDynamicModule(item as typeof Module | Module, dynamicModules.length > 1));


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


