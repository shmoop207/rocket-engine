"use strict";
import    Q = require('bluebird');
import   _ = require('lodash');
import   path = require('path');
import {Util} from "../util/util";
import {Injector} from "appolo-inject";
import {Module} from "./module";
import {ModuleSymbol} from "../decorators";
import {IOptions} from "../interfaces/IOptions";


export type ModuleFunction = ((...args: any[]) => void | Promise<any>)

export type ModuleFn = ModuleFunction | typeof Module | Module

export class ModuleManager {
    private readonly _modules: (typeof Module | Module)[];

    constructor(private _options: IOptions, private _injector: Injector) {
        this._modules = [];

    }

    public async loadDynamicModules(plugins: ((fn: Function) => void)[]) {

        for (let module of this._modules) {
            let moduleInstance = module instanceof Module ? module : new (module as typeof Module);
            await moduleInstance.initialize(this._injector, plugins);
        }
    }

    public load(moduleFn: ModuleFn): PromiseLike<any> {
        if (moduleFn instanceof Module || Reflect.hasMetadata(ModuleSymbol, moduleFn)) {
            this._modules.push(moduleFn as Module);
            return;
        }

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
        let modulesPath = path.join(this._options.root, 'modules/modules.js');

        await Util.loadPathWithArgs([modulesPath], this._injector)
    }


}


