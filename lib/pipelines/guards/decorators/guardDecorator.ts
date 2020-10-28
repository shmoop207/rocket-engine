import {IGuardCrt} from "../interfaces/IGuard";
import {guardPipeline} from "../pipeline/guardPipeline";
import {pipelineDecorator} from "../../decoreators/pipelineDecorators";

export function guard(guard: IGuardCrt, metaData?: any, options?: any) {

    return pipelineDecorator(guardPipeline, {guard, metaData}, options);
}
