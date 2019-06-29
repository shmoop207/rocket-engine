import {IPipelineContext, IMetadata, IPipeline, IPipelineMetadata, IPipeLineRunner, Next} from "./IPipeline";
import {PipeSetSymbol, PipeSymbol} from "../decoretors/pipeline";
import {runPipes} from "./pipelineRunner";
import {Util} from "../util/util";
import {Injector} from "appolo-inject/lib/inject";
import {App} from "../app";
import {Events} from "../interfaces/events";
import    _ = require('lodash');

export class PipelineManager {

    constructor(private _injector: Injector, private _app: App) {

    }

    public initialize() {

    }

    public handleExport(fn: any) {
        if (!Util.isClass(fn)) {
            return;
        }

        let metadata = Util.getReflectData<IMetadata>(PipeSymbol, fn);

        _.forEach(metadata, (pipelines, action) => {
            this.overrideMethod(pipelines, fn, action)
        });
    }

    public overrideMethod(pipelines: IPipelineMetadata[], fn: Function, action: string) {

        let old = fn.prototype[action];

        if (Reflect.hasMetadata(PipeSetSymbol, fn, action)) {
            return
        }

        Reflect.defineMetadata(PipeSetSymbol, pipelines, fn, action);

        pipelines = pipelines.reverse();

        this._convertPipeline(pipelines);

        pipelines.push({
            pipeline: (context: IPipelineContext, next: Next) => {
                return old.apply(context.instance, context.args)
            }
        });

        let argsTypes = Reflect.getMetadata("design:paramtypes", fn.prototype, action);

        let pipesCompiled = runPipes(pipelines);

        fn.prototype[action] = async function () {
            let result = await pipesCompiled({args: arguments, instance: this, type: fn, action, argsTypes});
            return result;
        };
    }

    private _convertPipeline(pipes: IPipelineMetadata[]) {
        _.forEach(pipes, (pipe, index) => {
            let id = Util.getClassId(pipe.pipeline);

            if (!id) {
                return
            }

            pipe.pipeline = (context: IPipelineContext, next: Next) => {
                let pipeline = this._injector.get<IPipeline>(id);

                return pipeline.run(context, next);
            }
        })
    }
}
