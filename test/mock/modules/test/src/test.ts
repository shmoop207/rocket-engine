import {define, module, Module, singleton} from '../../../../../index';

@define()
@singleton()
export class Test {

    get name(): string {
        return "working"
    }
}