import {Promises} from 'appolo-utils';
import {define, IFactory, inject, singleton,factory} from '../../../../../../index';
import {Delay} from "./delay";

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
