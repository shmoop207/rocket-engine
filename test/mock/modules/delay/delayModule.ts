import {module, Module} from '../../../../index';
import {Delay} from "./src/delay";


@module({
    exports: [Delay]
})
export class DelayModule extends Module {

    constructor(opts: { delay: number }) {
        super(opts);
    }
}

