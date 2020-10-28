import {PipelineContext} from "../../context/pipelineContext";

export interface IPipe {
    transform(value: any, context: PipelineContext): Promise<any>
}

export interface IPipeCrt {
    new(): IPipe
}
