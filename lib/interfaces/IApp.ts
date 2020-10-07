import {IEnv} from "./IEnv";
import {Define, Injector} from "@appolo/inject";

import {Event, EventDispatcher, IEvent} from "@appolo/events";

import {IEvents} from "./IEvents";
import {IDiscovery} from "./IDiscovery";
import {IModules} from "./IModules";
import {ITree} from "./ITree";

export interface IApp {
    readonly env: IEnv
    readonly injector: Injector
    readonly dispatcher: EventDispatcher
    readonly events: IEvents
    readonly discovery: IDiscovery;
    readonly modules: IModules;
    readonly tree: ITree;

    reset();

    launch(): Promise<IApp>


}
