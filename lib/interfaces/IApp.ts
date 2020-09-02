import {IEnv} from "./IEnv";
import {Define, Injector} from "@appolo/inject";
import {IEventDispatcher} from "@appolo/events";
import {IExported} from "./IModule";
import {Discovery} from "../launcher/discovery";

export interface IApp extends IEventDispatcher {
    env: IEnv
    injector: Injector

    reset()

    parent: IApp
    root: IApp
    children: IApp[]

    launch(): Promise<IApp>

    discovery: Discovery

}
