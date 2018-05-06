import {Module} from "../modules/module";

export interface IClass {
    new(...args: any[]): any
}

export type ModuleTypes =  (IClass | { id: string, type: IClass | string })[]

export type IPlugin = (fn: Function) => void;

export interface IModuleDefinition {
    options?: any
    modules?: (typeof Module | Module)[]
    exports?: ModuleTypes
    imports?: ModuleTypes
    root?: string
    immediate?:boolean

}