import {IEnv} from "../../../../../../lib/interfaces/IEnv";
import {define, singleton,inject,initMethod}  from '@appolo/inject';

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
