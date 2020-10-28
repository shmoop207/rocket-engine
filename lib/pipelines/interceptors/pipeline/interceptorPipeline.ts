import {PipelineContext} from "../../context/pipelineContext";
import {IInterceptor} from "../interfaces/IInterceptor";


export async function interceptorPipeline(context: PipelineContext, next: () => Promise<any>) {
    let interceptor = context.injector.get<IInterceptor>(context.metaData.interceptor)

    context.metaData = context.metaData.metaData;

    return interceptor.intercept(context, next);
}



