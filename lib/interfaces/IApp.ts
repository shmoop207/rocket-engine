import {IEnv} from "./IEnv";
import {Define, Injector} from "@appolo/inject";
import {IEventDispatcher} from "@appolo/events";
import {IExported} from "./IModule";
import {Discovery} from "../discovery/discovery";
import {Event, IEvent} from "@appolo/events/index";
import {
    EventBeforeInjectRegister,
    EventBeforeModuleInit,
    EventClassExport, EventInjectRegister,
    EventModuleExport,
    EventModuleInit
} from "./events";
import {IDefinition} from "@appolo/inject/lib/IDefinition";

export interface IApp {
    env: IEnv
    injector: Injector

    readonly eventModuleExport: IEvent<EventModuleExport>;
    readonly eventBeforeModuleInit: IEvent<EventBeforeModuleInit>;
    readonly eventModuleInit: IEvent<EventModuleInit>;
    readonly eventBeforeModulesLoad: IEvent<void>;
    readonly eventModulesLoaded: IEvent<void>;
    readonly eventBeforeInjectorInit: IEvent<void>;
    readonly eventInjectorInit: IEvent<void>;
    readonly eventBeforeBootstrap: IEvent<void>
    readonly eventBootstrap: IEvent<void>
    readonly eventsBeforeInjectRegister: IEvent<EventBeforeInjectRegister>
    readonly eventsEventClassExport: IEvent<EventClassExport>
    readonly eventsInjectRegister: IEvent<EventInjectRegister>
    readonly eventsBeforeReset: IEvent<void>
    readonly eventsReset: IEvent<void>
    readonly eventInstanceInitialized: IEvent<{ instance: any, definition: IDefinition }>
    readonly eventInstanceOwnInitialized: IEvent<{ instance: any, definition: IDefinition }>
    readonly eventInstanceCreated: IEvent<{ instance: any, definition: IDefinition }>
    readonly eventInstanceOwnCreated: IEvent<{ instance: any, definition: IDefinition }>

    reset();

    parent: IApp
    root: IApp

    getParent<T extends IApp = IApp>(): T

    getRoot<T extends IApp = IApp>(): T

    children: IApp[]

    launch(): Promise<IApp>

    discovery: Discovery

}
