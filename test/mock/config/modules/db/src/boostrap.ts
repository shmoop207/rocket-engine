import {define, IFactory, inject, singleton,factory,bootstrap} from '../../../../../../index';
import {DbFactory} from "./dbFactory";
@define()
@singleton()
@bootstrap()
export class Boostrap {

    @inject() moduleOptions: any;
    @inject() dbFactory: any;


    async run(){
        this.dbFactory.bootstrap = true
    }
}