//

import {Module} from "../modules/module";
import {Injector, IDefinition} from "@appolo/inject/index";

export type EventModuleExport = { id: string, type: Function, module: Module, injector: Injector }

export type EventBeforeModuleInit = { module: Module }
export type EventModuleInit = { module: Module }

export type EventBeforeInjectRegister = { type: Function, filePath: string }
export type EventClassExport = { type: Function, filePath: string }
export type EventInjectRegister = { type: Function, filePath: string, definition: IDefinition }
