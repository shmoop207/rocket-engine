import {define, IFactory, inject, singleton,factory,bootstrap} from '../../../../../../index';
import {DbFactory} from "./dbFactory";
@define()
@singleton()
@bootstrap()
export class Bootstrap {

    @inject() moduleOptions: any;
    @inject() dbFactory: any;


    async run(){
        this.dbFactory.bootstrapDecorator = true
    }
}