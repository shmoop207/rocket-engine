import { module, Module} from '../../../../../index';
import {Test} from "./src/test";
import {define, singleton,inject,initMethod}  from '@appolo/inject';


@module({})
export class TestLoadModule extends Module {

    get exports(){
        return []

    }

}



