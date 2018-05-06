import {define, module, Module, singleton} from '../../../../../index';
import {Test} from "./src/test";


@module({immediate:true})
export class TestModule extends Module<any> {

    get exports(){
        return [Test]

    }

}

