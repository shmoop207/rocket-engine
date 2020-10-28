import { module, Module, pipeline, Util} from '../../../../../index';
import {ValidatePipeLine} from "./src/validate";
import {define, singleton,inject,init,IFactory,factory}  from '@appolo/inject';
import {pipelineDecorator} from "../../../../../lib/pipelines/decoreators/pipelineDecorators";


export function validate(num: number) {

    return pipelineDecorator(ValidatePipeLine,{validateNum:num});

}

@module({})
export class ValidateModule extends Module {

    get exports() {
        return [ValidatePipeLine]

    }

}

