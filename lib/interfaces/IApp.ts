import {IEnv} from "./IEnv";
import {Injector} from "appolo-inject/index";

export interface IApp {
    env: IEnv
    injector: Injector
    reset()
    parent: IApp
    children: IApp[]
    launch(): Promise<IApp>
}