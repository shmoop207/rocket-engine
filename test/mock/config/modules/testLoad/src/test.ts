import {define, singleton,inject,init}  from '@appolo/inject';
import {IEnv} from "../../../env/IEnv";

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
