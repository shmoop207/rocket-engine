import {Module} from "../modules/module";

export interface IModuleDefinition {
    options?: any
    imports?: (typeof Module | Module)[]
    exports?: (string | Function)[]
    root?: string
}