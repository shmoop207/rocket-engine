import {Util} from "../util/util";

export function mixins(mixins: Function | Function[]): (fn: Function) => void {
    return function (fn: Function) {

        Util.mixins(fn, mixins);

    }
}