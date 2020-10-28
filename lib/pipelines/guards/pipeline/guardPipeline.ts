import {PipelineContext} from "../../context/pipelineContext";
import {GuardError} from "../errors/guardError";
import {IGuard} from "../interfaces/IGuard";

export async function guardPipeline(context: PipelineContext, next: () => Promise<any>) {
    let guard = context.injector.get<IGuard>(context.metaData.guard)

    context.metaData = context.metaData.metaData

    let result = await guard.isValid(context);

    if (!result) {
        throw new GuardError()
    }

    return next();
}



