import {Module, module} from '../../../../../index';
import {Delay} from "./src/delay";

@module()
export class DelayModule extends Module<{ delay: number, testModule: string, id?: string }> {

    public get exports() {
        return [{id: this.moduleOptions.id || "delay", type: Delay}];

    }

}

