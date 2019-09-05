import {IPipelineContext, IMetadata, IPipeline, IPipelineMetadata, IPipeLineRunner, Next} from "./IPipeline";
import {PipeSetSymbol, PipeSymbol} from "../decoretors/pipeline";
import {runPipes} from "./pipelineRunner";
import {Util} from "../util/util";
import {Reflector} from "../util/reflector";
import {Injector, Util as AppoloUtil} from "../../";
import {App} from "../app";
import    _ = require('lodash');
import {PipelineContext} from "./pipelineContext";

export class PipelineManager {

    constructor(private _injector: Injector, private _app: App) {

    }

    public initialize() {

    }

    public handleExport(fn: any) {
        if (!Util.isClass(fn)) {
            return;
        }

        let metadata = Reflector.getOwnMetadata<IMetadata>(PipeSymbol, fn);

        _.forEach(metadata, (pipelines, action) => {
            this.overrideMethod(pipelines, fn, action)
        });
    }

    public overrideMethod(pipelines: IPipelineMetadata[], fn: Function, action: string) {

        pipelines = _.cloneDeep(pipelines);

        this._convertPipeline(pipelines);

        let old = fn.prototype[action];

        pipelines = pipelines.reverse();

        pipelines.push({
            pipeline: (context: PipelineContext, next: Next) => {

                let fn = old["__PIPELINE__"] ? old["__PIPELINE__"] : old;

                return fn.apply(context.instance, context.arguments)
            }
        });

        let argsTypes = Reflect.getMetadata("design:paramtypes", fn.prototype, action);

        let pipesCompiled = runPipes(pipelines);

        fn.prototype[action] = async function () {
            let result = await pipesCompiled({args: arguments, instance: this, type: fn, action, argsTypes});
            return result;
        };

        fn.prototype[action]["__PIPELINE__"] = old
    }

    private _convertPipeline(pipes: IPipelineMetadata[]) {
        _.forEach(pipes, (pipe, index) => {
            let id = Util.getClassId(pipe.pipeline);

            if (!id) {
                return
            }

            let injector = this._injector;
            pipe.pipeline = (context: PipelineContext, next: Next) => {
                let pipeline = injector.get<IPipeline>(id);

                return pipeline.run(context, next);
            }
        })
    }
}
