import path = require('path');
import {IModuleDefinition} from "../interfaces/IModule";
import {Util} from "../util/util";
import {define,singleton,lazy} from "@appolo/inject";

export const ModuleSymbol = "__module__";
export const AppModuleOptionsSymbol = "__appModuleOptionsSymbol__";


export function module(options?: IModuleDefinition): (fn: Function) => void {

    options = options || {};
    options.root = path.dirname(Util.callerPath());

    return function (fn: Function) {
        singleton()(fn)
        define()(fn)
        Reflect.defineMetadata(ModuleSymbol, options, fn);
    }
}
