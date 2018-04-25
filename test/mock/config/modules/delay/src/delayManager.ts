import {define, inject, singleton} from '../../../../../../index';
import {IEnv} from "../../../../../../lib/interfaces/IEnv";

@define()
@singleton()
export class DelayManager {
    @inject() env: IEnv;
    @inject() delayProvider: number;

    get name(): string {
        return this.delayProvider + this.env.type
    }
}