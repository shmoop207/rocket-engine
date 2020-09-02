import { module, Module} from '../../../../../index';
import {Test} from "./src/test";
import {define, singleton,inject,initMethod}  from '@appolo/inject';


@module({immediate:true})
export class TestModule extends Module {

    get exports(){
        return [Test]

    }

}



