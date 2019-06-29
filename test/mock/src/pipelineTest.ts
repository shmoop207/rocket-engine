import {define,} from "../../../index";
import {IPipelineContext} from "../../../lib/pipelines/IPipeline";

@define()
export class PipelineTest {

   async run(context:IPipelineContext, next){
       context.args[0].push(2);
        return next()
   }
}
@define()
export class PipelineTest2 {

    async run(context:IPipelineContext, next){
        context.args[0].push(3);
         return next()
    }
}
