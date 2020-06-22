import {define, module, Module, singleton,inject,initMethod} from '../../../../../../index';
import {IEnv} from "../../../../../../lib/interfaces/IEnv";

@define()
@singleton()
export class Test {

    @inject() rootEnv:IEnv
    @initMethod()
    initialize(){
        this.rootEnv.testModule = "testModule";
    }

    get name(): string {
        return "working"
    }
}
