import {Module} from "../modules/module";
import {Define} from "@appolo/inject";

export interface IClass {
    new(...args: any[]): any
}

export type ModuleTypes = (IClass | { id: string, type: IClass | string })[]

export type IPlugin = (fn: Function) => void;

export interface IModuleDefinition {
    options?: any
    exports?: ModuleTypes
    imports?: ModuleTypes
    modules?: ModuleArg[]
    root?: string
    immediate?: boolean
    parallel?: boolean

}

export interface IModuleOptions {
    immediate?: boolean
    parallel?: boolean
}

export interface IExported {
    fn: Function,
    path: string,
    instance?: any
    define: Define
}


export interface IModuleCrt {
    new(...args: any[]): Module
}

export type ModuleFunction = ((...args: any[]) => void | Promise<any>)

export interface IModuleParams {
    module?: IModuleCrt,
    fn?: ModuleFunction,
    options?: any,
    moduleOptions: IModuleOptions
}

export type ModuleArg = ModuleFunction | IModuleParams | IModuleCrt

