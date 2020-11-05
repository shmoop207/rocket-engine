import {IEvent} from "@appolo/events/index";

import {InjectEvent} from "@appolo/inject/lib/events/events";
import {Module} from "../modules/module";
import {IDefinition, Injector} from "@appolo/inject/index";

export type EventModuleExport = { id: string, type: Function, module: Module, injector: Injector }

export type EventBeforeModuleInit = { module: Module }
export type EventModuleInit = { module: Module }

export type EventBeforeInjectRegister = { type: Function, filePath: string }
export type EventClassExport = { type: Function, filePath: string }
export type EventInjectRegister = { type: Function, filePath: string, definition: IDefinition }


export interface IEvents {

    readonly onModuleExport: IEvent<EventModuleExport>
    readonly beforeModuleInitialize: IEvent<EventBeforeModuleInit>
    readonly afterModuleInitialize: IEvent<EventModuleInit>
    readonly beforeModulesLoad: IEvent<void>
    readonly afterModulesLoaded: IEvent<void>
    readonly beforeInjectorInitialize: IEvent<void>
    readonly afterInjectorInitialize: IEvent<void>
    readonly beforeBootstrap: IEvent<void>
    readonly afterBootstrap: IEvent<void>
    readonly afterLaunch: IEvent<void>
    readonly beforeInjectRegister: IEvent<EventBeforeInjectRegister>
    readonly onClassExport: IEvent<EventClassExport>
    readonly afterInjectRegister: IEvent<EventInjectRegister>
    readonly beforeReset: IEvent<void>
    readonly afterReset: IEvent<void>

    readonly onOwnInstanceInitialized: IEvent<InjectEvent>
    readonly onInstanceInitialized: IEvent<InjectEvent>
    readonly onOwnInstanceCreated: IEvent<InjectEvent>
    readonly onInstanceCreated: IEvent<InjectEvent>


    readonly beforeInjectInitDefinitions: IEvent<void>
    readonly beforeInjectInitFactories: IEvent<void>
    readonly beforeInjectInitInstances: IEvent<void>
    readonly beforeInjectInitProperties: IEvent<void>
    readonly beforeInjectInitMethods: IEvent<void>
    readonly beforeInjectBootstrapMethods: IEvent<void>

}
