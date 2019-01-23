import {IEnv} from "./IEnv";
import {Define, Injector} from "appolo-inject/index";
import {IEventDispatcher} from "appolo-event-dispatcher/";

export interface IApp extends IEventDispatcher {
    env: IEnv
    injector: Injector

    reset()

    parent: IApp
    children: IApp[]

    launch(): Promise<IApp>

    exported: { fn: Function, path: string, define: Define }[]

}