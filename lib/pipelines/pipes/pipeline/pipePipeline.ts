import {PipelineContext} from "../../context/pipelineContext";
import {IPipe, IPipeCrt} from "../interfaces/IPipe";

export async function pipePipeline(context: PipelineContext<{ pipe: IPipeCrt, metaData: any }>, next: () => Promise<any>) {
    let pipe = context.injector.get<IPipe>(context.metaData.pipe)

    context.metaData = context.metaData.metaData

    let result = await pipe.transform(context.value, context);

    context.setArgumentAt(context.index || 0, result);

    return next();
}



