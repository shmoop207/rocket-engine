import path = require('path');
import {IModuleDefinition} from "../interfaces/IModule";
import {Helpers} from "../util/helpers";
import {define,singleton,lazy,factory} from "@appolo/inject";
import {initMethodAsync} from "@appolo/inject/index";

export const ModuleSymbol = "__module__";
export const AppModuleOptionsSymbol = "__appModuleOptionsSymbol__";


export function module(options?: IModuleDefinition): (fn: Function) => void {

    options = options || {};
    options.root = path.dirname(Helpers.callerPath());

    return function (fn: Function) {
        define()(fn)


        Reflect.defineMetadata(ModuleSymbol, options, fn);
    }
}
