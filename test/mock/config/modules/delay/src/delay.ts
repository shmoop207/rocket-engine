import {define, inject, singleton} from '../../../../../../index';
import {DelayManager} from "./delayManager";

@define()
@singleton()
    export class Delay {

    @inject() delayManager: DelayManager;
    @inject() moduleOptions: any;

    get data(): {time:number,msg:string} {
        return  {time:this.delayManager.time,msg:this.moduleOptions.testModule};
    }
}