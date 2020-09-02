import {IEnv} from "../../../../../../lib/interfaces/IEnv";
import {IPipelineContext} from "../../../../../../lib/pipelines/IPipeline";
import {PipelineContext} from "../../../../../../lib/pipelines/pipelineContext";
import {define, singleton,inject,initMethod,IFactory,factory}  from '@appolo/inject';

@define()
@singleton()
export class ValidatePipeLine {


    run(context: PipelineContext<{ validateNum: number }>, next) {

        context.values.forEach(item => {
            if (item.value > context.metaData.validateNum) {

                context.setArgumentAt(item.index, 0);

            }
        });

        return next()
    }
}
