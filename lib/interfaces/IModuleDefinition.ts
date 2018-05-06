import {Module} from "../modules/module";

export type Class = { new(...args: any[]): any; };
export type ModuleTypes =  (Class | { id: string, type: Class | string })[]

export type IPlugin = (fn: Function) => void;

export interface IModuleDefinition {
    options?: any
    modules?: (typeof Module | Module)[]
    exports?: ModuleTypes
    imports?: ModuleTypes
    root?: string
    immediate?:boolean

}