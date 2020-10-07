import {Promises} from '@appolo/utils';
import {} from '../../../../../../index';
import {IEnv} from "../../../../../../lib/interfaces/IEnv";
import {Test} from "../../test/src/test";
import {DbFactory} from "./dbFactory";
import {define, singleton,inject,init,IFactory,factory}  from '@appolo/inject';

@define()
@singleton()
export class DbManager {


    @inject() dbFactory: DbFactory;
    @inject() env2: IEnv;
    @inject() test: Test;

    public isFoundExportedFile:boolean = false;
    public onInitCalled:boolean = false;



    public get db(){
        return this.dbFactory
    }
}
