import {} from '../../../../../../index';
import {DelayManager} from "./delayManager";
import {define, singleton,inject,init}  from '@appolo/inject';

@define()
@singleton()
export class Delay {

    @inject() delayManager: DelayManager;
    @inject() moduleOptions: any;

    get data(): { time: number, msg: string } {
        return {time: this.delayManager.time, msg: this.moduleOptions.testModule};
    }
}
