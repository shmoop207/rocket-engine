import path = require('path');
import "reflect-metadata";
import {Util} from "./util/util";
import {IModuleDefinition} from "./interfaces/IModuleDefinition";

export const BootstrapSymbol = Symbol("__bootstrap__");
export const ModuleSymbol = Symbol("__module__");


export function mixins(mixins: Function | Function[]): (fn: Function) => void {
    return function (fn: Function) {

        Util.mixins(fn, mixins);

    }
}

export function module(options?: IModuleDefinition): (fn: Function) => void {

    options = options || {};
    options.root = path.dirname(Util.callerPath());

    return function (fn: Function) {
        Reflect.defineMetadata(ModuleSymbol, options, fn);
    }
}

export function bootstrap(): (fn: Function) => void {
    return function (fn: Function) {

        Reflect.defineMetadata(BootstrapSymbol, true, fn);

    }
}

