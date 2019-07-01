import {define,} from "../../../index";
import {IPipelineContext} from "../../../lib/pipelines/IPipeline";
import {PipelineContext} from "../../../lib/pipelines/pipelineContext";

@define()
export class PipelineTest {

   async run(context:PipelineContext, next){
       context.getArgumentAt(0).push(2);
        return next()
   }
}
@define()
export class PipelineTest2 {

    async run(context:PipelineContext, next){
        context.getArgumentAt(0).push(3);
         return next()
    }
}