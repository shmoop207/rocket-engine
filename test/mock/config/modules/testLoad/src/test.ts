import {IEnv} from "../../../../../../lib/interfaces/IEnv";
import {define, singleton,inject,init}  from '@appolo/inject';

@define()
@singleton()
export class Test {

    @inject() rootEnv:IEnv
    @init()
    initialize(){
        this.rootEnv.testLoadModule = true;
    }

    get name(): string {
        return "working"
    }
}
