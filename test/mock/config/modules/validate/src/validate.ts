import {define, module, Module, singleton, inject, initMethod, Util} from '../../../../../../index';
import {IEnv} from "../../../../../../lib/interfaces/IEnv";
import {IPipelineContext} from "../../../../../../lib/pipelines/IPipeline";
import {PipelineContext} from "../../../../../../lib/pipelines/pipelineContext";

@define()
@singleton()
export class ValidatePipeLine {


    run(context: PipelineContext<{ validateNum: number }>, next) {

        context.values.forEach(item=>{
            if (item.value > context.metaData.validateNum) {

                context.setArgumentAt(item.index,0);

            }
        });


        return next()
    }
}
