import {IEnv} from "./IEnv";
import {Injector} from "appolo-inject/index";
import {IEventDispatcher} from "appolo-event-dispatcher/";

export interface IApp extends IEventDispatcher {
    env: IEnv
    injector: Injector

    reset()

    parent: IApp
    children: IApp[]

    launch(): Promise<IApp>

    exportedClasses: { fn: Function, path: string }[]

}