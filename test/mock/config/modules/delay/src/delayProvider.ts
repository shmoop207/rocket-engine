import Q  = require('bluebird');
import {define, IFactory, inject, singleton,factory} from '../../../../../../index';
import {Delay} from "./delay";

@define()
@singleton()
@factory()
export class DelayProvider implements IFactory<{delay:number,time:number}> {

    @inject() moduleOptions: any;
    @inject() delay: Delay;

    async get(): Promise<{delay:number,time:number}> {

        await Q.delay(this.moduleOptions.delay);

        return {delay:this.moduleOptions.delay,time:Date.now()}

    }
}