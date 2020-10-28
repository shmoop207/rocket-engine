import {pipelineDecorator} from "../../decoreators/pipelineDecorators";
import {IPipeCrt} from "../interfaces/IPipe";
import {pipePipeline} from "../pipeline/pipePipeline";

export function pipe(pipe: IPipeCrt, metaData?: any, options?: any) {

    return pipelineDecorator(pipePipeline, {pipe, metaData}, options);
}
