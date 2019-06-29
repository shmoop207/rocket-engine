import {define, module, Module, singleton, inject, initMethod, Util} from '../../../../../../index';
import {IEnv} from "../../../../../../lib/interfaces/IEnv";
import {IPipelineContext} from "../../../../../../lib/pipelines/IPipeline";

@define()
@singleton()
export class ValidatePipeLine {


    run(context: IPipelineContext<{ validateNum: number }>, next) {

        let index = 0;

        if (context.index >= 0) {
            index = context.index;
        }


        if (context.args[index] > context.metaData.validateNum) {


            context.args[index] = 0;


        }

        return next()
    }
}
