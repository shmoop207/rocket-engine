"use strict";
import {Promises, Arrays, Classes, Functions} from '@appolo/utils';
import   path = require('path');
import {Helpers} from "../util/helpers";
import {Injector} from "@appolo/inject";
import {Module} from "./module";
import {Event} from "@appolo/events";
import {IOptions} from "../interfaces/IOptions";
import {IModuleCrt, IModuleOptions, IModuleParams, IPlugin, ModuleArg, ModuleFunction} from "../interfaces/IModule";
import {ModuleSymbol} from "../decoretors/moduleDecorators";
import {App} from "../app";
import {ModuleLoader} from "./moduleLoader";
import {Util as InjectUtil} from "@appolo/inject";
import {Util} from "../util/util";
import {IApp} from "../interfaces/IApp";
import {EventBeforeModuleInit, EventModuleInit} from "../interfaces/events";


export class ModulesManager {
    private readonly _modules: ModuleLoader[];

    constructor(private _options: IOptions, private _injector: Injector) {
        this._modules = [];
    }

    public get modules(): ModuleLoader[] {
        return this._modules;
    }

    public async loadDynamicModules() {

        for (let i = 0, len = this._modules.length; i < len; i++) {
            this._modules[i].preInitialize();
        }

        await (this._injector.get<IApp>(App).events.beforeModulesLoad as Event<void>).fireEventAsync();

        await InjectUtil.runRegroupByParallel<ModuleLoader>(this._modules, loader => loader.moduleOptions.parallel, module => this._loadModule(module));

        await (this._injector.get<IApp>(App).events.afterModulesLoaded as Event<void>).fireEventAsync();

    }

    // public async beforeBootstrap() {
    //
    //
    //     await InjectUtil.runRegroupByParallel<ModuleLoader>(this._modules, loader => loader.moduleOptions.parallel, loader => loader.module.afterAppLaunch());
    // }
    //
    // public async afterAppInitialize() {
    //
    //
    //     await InjectUtil.runRegroupByParallel<ModuleLoader>(this._modules, loader => loader.moduleOptions.parallel, loader => loader.module.afterAppInitialize());
    // }

    private async _loadModule(module: ModuleLoader) {
        await (this._injector.get<IApp>(App).events.beforeModuleInitialize as Event<EventBeforeModuleInit>).fireEventAsync({module: module.module});

        await module.initialize();

        await (this._injector.get<App>(App).events.afterModuleInitialize as Event<EventModuleInit>).fireEventAsync({module: module.module});
    }


    private _prepareModuleArgs(modules: ModuleArg[]): IModuleParams[] {
        let moduleParams = modules.map<IModuleParams>((item: any) => {

            let dto: IModuleParams;

            if (Classes.isClass(item)) {
                dto = {type: item, config: {}}
            } else {
                dto = {config: {}, ...item}
            }

            return dto;
        })

        return moduleParams;
    }

    public register(modules: ModuleArg[]): void {

        let moduleParams = this._prepareModuleArgs(modules);

        moduleParams.forEach(item => this._registerModule(item, {parallel: moduleParams.length > 1, immediate: false}));

    }

    private _registerModule(moduleParams: IModuleParams, moduleOptions: IModuleOptions) {

        let loader = new ModuleLoader(moduleParams, this._injector, moduleOptions);

        this._modules.push(loader);

    }

    public async load(modulesArgs: ModuleArg[]): Promise<Module[]> {

        let moduleParams = this._prepareModuleArgs(modulesArgs);

        let modules: Module[] = await Promises.map(moduleParams, async moduleParam => {

            let moduleOptions: IModuleOptions = {parallel: moduleParams.length > 1, immediate: true}

            let loader = new ModuleLoader(moduleParam, this._injector, moduleOptions);

            loader.preInitialize();

            await this._loadModule(loader);

            return loader.module;
        })

        return modules;

    }

    public loadStaticModule(fn: ModuleFunction): PromiseLike<any> {
        //remove the callback arg
        let args = Classes.functionArgsNames(fn),
            lastArg = args[args.length - 1],
            isCallback = false;

        if (['callback', 'next', 'fn', 'func'].indexOf(lastArg) > -1) {
            args = args.slice(0, -1);
            isCallback = true;
        }

        let dependencies = args.map((arg: string) => this._injector.getObject(arg));

        if (isCallback) {
            return Promises.fromCallback((callback) => (fn).apply(fn, dependencies.concat([callback])));
        }

        return Promise.resolve().then(() => (fn).apply(fn, dependencies))
    }

    public async loadStaticModules(): Promise<void> {


        let allPath = path.join(this._options.root, 'config/modules/all.js'),
            environmentPath = path.join(this._options.root, 'config/modules/', this._options.environment + '.js');


        await Util.loadPathWithArgs([allPath, environmentPath], this._injector)
    }

    public reset() {
        return Promise.all(this._modules.map(module => module.reset()));
    }

    public beforeReset() {
        return Promise.all(this._modules.map(module => module.beforeReset()));
    }


}


