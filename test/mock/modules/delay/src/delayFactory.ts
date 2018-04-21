import Q  = require('bluebird');
import {define, IFactory, inject, singleton,factory} from '../../../../../index';
import {Delay} from "./delay";

@define()
@singleton()
@factory()
export class DelayFactory implements IFactory<Promise<Delay>> {

    @inject() test: Delay;
    @inject() moduleOptions: any;

    async get(): Promise<Delay> {

        await Q.delay(this.moduleOptions.delay);

        return this.test;

    }
}