import {define} from "../../../index";

@define()
export class BeforeTest {

    public run(num) {
        return num + 5
    }

    public runAfter(num) {
        return num + 5
    }
}