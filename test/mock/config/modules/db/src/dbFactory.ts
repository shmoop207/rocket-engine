import {Promises} from '@appolo/utils';
import {} from '../../../../../../index';
import {IEnv} from "../../../../../../lib/interfaces/IEnv";
import {Test} from "../../test/src/test";
import {define, singleton,inject,init,IFactory,factory}  from '@appolo/inject';


@define()
@singleton()
@factory()
export class DbFactory implements IFactory<{conn:string,env:string,name:string,time:number}> {


    @inject() moduleOptions: any;
    @inject() env2: IEnv;
    @inject() test: Test;

    async get(): Promise<{conn:string,env:string,name:string,time:number}> {

        await Promises.delay(1);


        return {conn:"working",env:this.env2.type,name:this.test.name,time:Date.now()}

    }
}
