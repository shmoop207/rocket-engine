import { module, Module, pipeline, Util} from '../../../../../index';
import {ValidatePipeLine} from "./src/validate";
import {define, singleton,inject,init,IFactory,factory}  from '@appolo/inject';


export function validate(num: number) {
    return function (fn: any, propertyName: string,index?:number| PropertyDescriptor) {
        pipeline(ValidatePipeLine,{validateNum:num})(fn, propertyName,index)
    }
}

@module({})
export class ValidateModule extends Module {

    get exports() {
        return [ValidatePipeLine]

    }

}

