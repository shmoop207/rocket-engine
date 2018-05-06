import {define, inject, singleton} from '../../../../../../index';
import {DelayManager} from "./delayManager";

@define()
@singleton()
export class Delay {

    @inject() delayManager: DelayManager;
    @inject() moduleOptions: any;

    get name(): string {
        return "delay" + this.delayManager.name+ this.moduleOptions.testModule;
    }
}