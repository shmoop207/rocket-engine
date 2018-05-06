import {module, Module} from '../../../../../index';
import {Delay} from "./src/delay";
import {DelayProvider} from "./src/delayProvider";


@module({
    exports: [Delay]
})
export class DelayModule extends Module<{ delay: number,testModule:string }> {
    
}

