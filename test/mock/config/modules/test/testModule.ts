import {define, module, Module, singleton} from '../../../../../index';
import {Test} from "./src/test";


@module({immediate:true})
export class TestModule extends Module {

    get exports(){
        return [Test]

    }

}

