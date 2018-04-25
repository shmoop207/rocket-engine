import Q  = require('bluebird');
import {define, IFactory, inject, singleton,factory} from '../../../../../../index';
import {Delay} from "./delay";

@define()
@singleton()
@factory()
export class DelayProvider implements IFactory<number> {

    @inject() delay: Delay;
    @inject() moduleOptions: any;

    async get(): Promise<number> {

        await Q.delay(this.moduleOptions.delay);

        return this.moduleOptions.delay

    }
}