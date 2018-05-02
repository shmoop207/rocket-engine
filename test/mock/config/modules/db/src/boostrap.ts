import {define, IFactory, inject, singleton,factory,bootstrap} from '../../../../../../index';
@define()
@singleton()
@bootstrap()
export class Boostrap {

    @inject() moduleOptions: any;


    async run(){
        return this.moduleOptions.id
    }
}