import Q  = require('bluebird');
import {define, IFactory, inject, singleton,factory} from '../../../../../../index';

@define()
@singleton()
@factory()
export class DbFactory implements IFactory<{conn:string}> {


    @inject() moduleOptions: any;

    async get(): Promise<{conn:string}> {

        await Q.delay(1);

        return {conn:"working"}

    }
}