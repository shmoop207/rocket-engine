import {pipelineDecorator} from "../../decoreators/pipelineDecorators";
import {interceptorPipeline} from "../pipeline/interceptorPipeline";
import {IInterceptorCrt} from "../interfaces/IInterceptor";

export function intercept(interceptor: IInterceptorCrt, metaData?: any, options?: any) {

    return pipelineDecorator(interceptorPipeline, {interceptor, metaData}, options);
}
