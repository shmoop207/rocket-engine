import {PipelineContext} from "../../context/pipelineContext";

export interface IInterceptor {
    intercept(context: PipelineContext,next: () => Promise<any>):Promise<any>
}

export interface IInterceptorCrt {
    new(): IInterceptor
}
