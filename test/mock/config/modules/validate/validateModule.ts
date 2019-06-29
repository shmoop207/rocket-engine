import {define, module, Module, singleton, pipeline, Util} from '../../../../../index';
import {ValidatePipeLine} from "./src/validate";


export function validate(num: number) {
    return function (fn: any, propertyName: string,index?:number| PropertyDescriptor) {
        pipeline(ValidatePipeLine,{validateNum:num})(fn, propertyName,index)
    }
}

@module({immediate: true})
export class ValidateModule extends Module {

    get exports() {
        return [ValidatePipeLine]

    }

}

