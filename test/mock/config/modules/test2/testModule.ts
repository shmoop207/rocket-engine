import { module, Module} from '../../../../../index';
import {Test2} from "./src/test";
import {define, singleton,inject,initMethod,IFactory,factory}  from '@appolo/inject';


@module({immediate: false,exports:[Test2]})
export class Test2Module extends Module {

    // get exports() {
    //     return [Test2]
    //
    // }

}

