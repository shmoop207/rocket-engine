import {IModuleOptions, Module, module} from '../../../../../index';
import {Delay} from "./src/delay";

interface IOptions extends IModuleOptions {
    delay: number,
    testModule: string,
    id?: string
}


@module()
export class DelayModule extends Module<IOptions> {

    public get exports() {
        return [{id: this.moduleOptions.id || "delay", type: Delay}];

    }

}

