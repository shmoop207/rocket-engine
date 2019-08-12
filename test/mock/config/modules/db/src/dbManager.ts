import Q  = require('bluebird');
import {define, IFactory, inject, singleton,factory} from '../../../../../../index';
import {IEnv} from "../../../../../../lib/interfaces/IEnv";
import {Test} from "../../test/src/test";
import {DbFactory} from "./dbFactory";

@define()
@singleton()
export class DbManager {


    @inject() dbFactory: DbFactory;
    @inject() env2: IEnv;
    @inject() test: Test;

    public isFoundExportedFile:boolean = false;



    public get db(){
        return this.dbFactory
    }
}
