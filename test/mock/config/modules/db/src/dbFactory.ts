import Q  = require('bluebird');
import {define, IFactory, inject, singleton,factory} from '../../../../../../index';
import {IEnv} from "../../../../../../lib/interfaces/IEnv";

@define()
@singleton()
@factory()
export class DbFactory implements IFactory<{conn:string,env:string}> {


    @inject() moduleOptions: any;
    @inject() env2: IEnv;

    async get(): Promise<{conn:string,env:string}> {

        await Q.delay(1);

        return {conn:"working",env:this.env2.type}

    }
}