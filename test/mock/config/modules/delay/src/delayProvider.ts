import {Promises} from '@appolo/utils';
import {Delay} from "./delay";
import {define, singleton,inject,init,IFactory,factory}  from '@appolo/inject';

@define()
@singleton()
@factory()
export class DelayProvider implements IFactory<{delay:number,time:number}> {

    @inject() moduleOptions: any;

    async get(): Promise<{delay:number,time:number}> {

        let time = Date.now();

        await Promises.delay(this.moduleOptions.delay);

        return {delay:this.moduleOptions.delay,time: Date.now() - time}

    }
}
