import Q  = require('bluebird');
import {define, IFactory, inject, singleton,factory} from '../../../../../../index';
import {IEnv} from "../../../../../../lib/interfaces/IEnv";
import {Test} from "../../test/src/test";

@define()
@singleton()
@factory()
export class DbFactory implements IFactory<{conn:string,env:string,name:string,time:number}> {


    @inject() moduleOptions: any;
    @inject() env2: IEnv;
    @inject() test: Test;

    async get(): Promise<{conn:string,env:string,name:string,time:number}> {

        await Q.delay(1);


        return {conn:"working",env:this.env2.type,name:this.test.name,time:Date.now()}

    }
}