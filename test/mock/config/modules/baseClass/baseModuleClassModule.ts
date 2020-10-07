import { module, Module, pipeline, Util} from '../../../../../index';
import {define, singleton,inject,init,IFactory,factory}  from '@appolo/inject';


@module({})
export class BaseModuleClassModule extends Module {

    get exports() {
        return []

    }

}

