import {define, module, Module, singleton,inject,initMethod} from '../../../../../../index';
import {IEnv} from "../../../../../../lib/interfaces/IEnv";

@define()
@singleton()
export class Test2 {


    get name(): string {
        return "working"
    }
}
