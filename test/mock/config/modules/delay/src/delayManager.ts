import {define, inject, singleton} from '../../../../../../index';
import {IEnv} from "../../../../../../lib/interfaces/IEnv";

@define()
@singleton()
export class DelayManager {
    @inject() env: IEnv;
    @inject() delayProvider: {delay:number,time:number};

    get time(): number {
        return this.delayProvider.time
    }
}