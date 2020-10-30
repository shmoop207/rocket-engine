import {PipelineContext} from "../../context/pipelineContext";
import {IException, IExceptionCrt} from "../interfaces/IException";

export async function exceptionPipeline(context: PipelineContext<{ exception: IExceptionCrt, metaData: any }>, next: () => Promise<any>) {

    let exceptionCtr = context.metaData.exception;
    context.metaData = context.metaData.metaData;


    try {
        let result = await next();

        return result;
    } catch (e) {
        let exception = context.injector.get<IException>(exceptionCtr);

        return exception.catch(e, context);
    }

}



