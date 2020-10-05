import {IEnv} from "./IEnv";
import {Define, Injector} from "@appolo/inject";
import {IEventDispatcher} from "@appolo/events";
import {IExported} from "./IModule";
import {Discovery} from "../discovery/discovery";
import {Event, EventDispatcher, IEvent} from "@appolo/events";
import {
    EventBeforeInjectRegister,
    EventBeforeModuleInit,
    EventClassExport, EventInjectRegister,
    EventModuleExport,
    EventModuleInit
} from "./events";
import {IDefinition} from "@appolo/inject";
import {Module} from "../modules/module";
import {Events} from "../events/events";
import {Modules} from "../modules/modules";
import {Tree} from "../tree/tree";

export interface IApp {
    readonly env: IEnv
    readonly injector: Injector
    readonly dispatcher: EventDispatcher
    readonly events: Events
    readonly discovery: Discovery;
    readonly modules: Modules;
    readonly tree: Tree;

    reset();

    launch(): Promise<IApp>


}
