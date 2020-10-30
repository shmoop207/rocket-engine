import {pipelineDecorator} from "../../decoreators/pipelineDecorators";
import {IExceptionCrt} from "../interfaces/IException";
import {exceptionPipeline} from "../pipeline/exceptionPipeline";

export function exception(exception: IExceptionCrt, metaData?: any, options?: any) {

    return pipelineDecorator(exceptionPipeline, {exception, metaData}, options);
}
