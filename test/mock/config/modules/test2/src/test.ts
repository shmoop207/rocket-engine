import {IEnv} from "../../../../../../lib/interfaces/IEnv";

import {define, singleton,inject,init,IFactory,factory}  from '@appolo/inject';


@define()
@singleton()
export class Test2 {


    get name(): string {
        return "working"
    }
}
