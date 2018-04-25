import {Module} from "../modules/module";

export type Class = { new(...args: any[]): any; };

export interface IModuleDefinition {
    options?: any
    imports?: (typeof Module | Module)[]
    exports?: (Class | { id: string, type: Class })[]
    root?: string
}