"use strict";
import {Promises, Arrays, Classes, Functions} from '@appolo/utils';
import   path = require('path');
import {Util} from "../util/util";
import {Injector} from "@appolo/inject";
import {Module} from "./module";
import {IOptions} from "../interfaces/IOptions";
import {IModuleParams, IPlugin, ModuleArg} from "../interfaces/IModule";
import {ModuleSymbol} from "../decoretors/moduleDecorators";
import {App} from "../app";
import {Events} from "../interfaces/events";
import {ModuleLoader} from "./moduleLoader";
import { Util as InjectUtil} from "@appolo/inject";
import {ExportedUtil} from "../util/exportedUtil";


export class ModuleManager {
    private readonly _modules: ModuleLoader[];

    constructor(private _options: IOptions, private _injector: Injector) {
        this._modules = [];
    }

    public async loadDynamicModules() {

        for (let i = 0, len = this._modules.length; i < len; i++) {
            this._modules[i].preInitialize();
        }

        await InjectUtil.runRegroupByParallel<ModuleLoader>(this._modules, loader => loader.moduleOptions.parallel, module => this._loadModule(module));
    }

    public async initAfterInjectDynamicModules() {


        await InjectUtil.runRegroupByParallel<ModuleLoader>(this._modules, loader => loader.moduleOptions.parallel, module => module.afterLaunch());
    }

    private async _loadModule(module: ModuleLoader) {
        this._injector.get<App>(App).fireEvent(Events.BeforeModuleInit, module);

        await module.initialize();

        this._injector.get<App>(App).fireEvent(Events.ModuleInit, module);

    }

    private async _registerModule(moduleParams: IModuleParams, isParallel: boolean) {

        moduleParams.moduleOptions.parallel = isParallel;

        let loader = new ModuleLoader(moduleParams, this._injector);

        if (moduleParams.moduleOptions.immediate) {
            loader.preInitialize();
            await this._loadModule(loader);
        } else {
            this._modules.push(loader);
        }
    }


    public async load(modules: ModuleArg[]): Promise<any> {

        let moduleParams = modules.map<IModuleParams>((item: any) => {
            if (Classes.isClass(item)) {
                return {module: item,options: {}, moduleOptions: {}}
            } else if (Functions.isFunction(item)) {
                return {fn: item, options: {}, moduleOptions: {}}
            } else {
                return {options: {}, moduleOptions: {}, ...item}
            }
        })


        let [dynamicModules, staticModules] = Arrays.partition(moduleParams, module => !!module.module)

        await Promises.map(dynamicModules, item => this._registerModule(item, dynamicModules.length > 1));


        await Promises.map(staticModules, item => this._loadStaticModule(item));


    }

    private _loadStaticModule(moduleParams: IModuleParams): PromiseLike<any> {
        //remove the callback arg
        let args = Classes.functionArgsNames(moduleParams.fn),
            lastArg = args[args.length - 1],
            isCallback = false;

        if (['callback', 'next', 'fn', 'func'].indexOf(lastArg) > -1) {
            args = args.slice(0, -1);
            isCallback = true;
        }

        let dependencies = args.map((arg: string) => this._injector.getObject(arg));

        if (isCallback) {
            return Promises.fromCallback((callback) => (moduleParams.fn).apply(moduleParams.fn, dependencies.concat([callback])));
        }

        return Promise.resolve().then(() => (moduleParams.fn).apply(moduleParams.fn, dependencies))
    }

    public async loadStaticModules(): Promise<void> {


        let allPath = path.join(this._options.root, 'config/modules/all.js'),
            environmentPath = path.join(this._options.root, 'config/modules/', this._options.environment + '.js');


        await ExportedUtil.loadPathWithArgs([allPath, environmentPath], this._injector)
    }


}


