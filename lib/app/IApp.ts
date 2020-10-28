import {IEnv} from "../interfaces/IEnv";
import {Define, Injector} from "@appolo/inject";

import {Event, EventDispatcher, IEvent} from "@appolo/events";

import {IEvents} from "../events/IEvents";
import {IDiscovery} from "../discovery/IDiscovery";
import {IModules} from "../modules/interfaces/IModules";
import {ITree} from "../tree/ITree";

export interface IApp {
    readonly env: IEnv
    readonly injector: Injector
    readonly dispatcher: EventDispatcher
    readonly event: IEvents
    readonly discovery: IDiscovery;
    readonly module: IModules;
    readonly tree: ITree;

    reset();

    launch(): Promise<IApp>


}
