import {} from "../../../index";
import {define, singleton,inject,init,IFactory,factory}  from '@appolo/inject';

@define()
export class BeforeTest {

    public run(num) {
        return num + 5
    }

    public runAfter(num) {
        return num + 5
    }
}
