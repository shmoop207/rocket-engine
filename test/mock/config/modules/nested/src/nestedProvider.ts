import {Promises} from 'appolo-utils';
import {define, IFactory, inject, singleton,factory} from '../../../../../../index';

@define()
@singleton()
@factory()
export class NestedProvider implements IFactory<{delay:number,time:number,dbMock2:any}> {

    @inject() dbMock2DbManager: any;
    @inject() moduleOptions: any;

    async get(): Promise<{dbMock2:any,delay:number,time:number}> {

        //await Q.delay(this.moduleOptions.delay);

        return {dbMock2:this.dbMock2DbManager,delay:this.moduleOptions.delay,time:Date.now()}

    }
}
