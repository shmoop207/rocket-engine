import {define, module, Module, singleton,inject} from '../../../../../index';
import {IEnv} from "../../../../../lib/interfaces/IEnv";
import {DelayManager} from "./delayManager";

@define()
@singleton()
export class Delay {

    @inject() delayManager:DelayManager;
    @inject() moduleOptions:any;

    get name(): string {
        return "delay"+this.delayManager.name+ this.moduleOptions.delay
    }
}