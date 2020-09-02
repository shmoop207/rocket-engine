import {} from '../../../../../../index';
import {IEnv} from "../../../../../../lib/interfaces/IEnv";
import {define, singleton,inject,initMethod}  from '@appolo/inject';

@define()
@singleton()
export class DelayManager {
    @inject() env: IEnv;
    @inject() delayProvider: {delay:number,time:number};

    get time(): number {
        return this.delayProvider.time
    }
}
