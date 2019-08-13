import {define, module, Module, singleton} from '../../../../../index';
import {Test2} from "./src/test";


@module({immediate: false,exports:[Test2]})
export class Test2Module extends Module {

    // get exports() {
    //     return [Test2]
    //
    // }

}

