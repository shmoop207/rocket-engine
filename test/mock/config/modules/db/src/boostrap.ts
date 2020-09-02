import {bootstrap} from '../../../../../../index';
import {DbFactory} from "./dbFactory";
import {define, singleton,inject,initMethod,IFactory,factory}  from '@appolo/inject';

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
