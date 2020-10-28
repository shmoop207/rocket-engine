import {IPipelineContext, IMetadata, IPipeline, IPipelineMetadata, IPipeLineRunner, Next} from "./interfaces/IPipeline";
import {
    PipeInstanceCreateSymbol,
    PipeKlassRegisterSymbol,
    PipeSetSymbol,
    PipeSymbol
} from "./decoreators/pipelineDecorators";
import {runPipes} from "./pipelineRunner";
import {Helpers} from "../util/helpers";
import {Reflector, Objects} from "@appolo/utils";
import {App} from "../app/app";
import {Injector} from "@appolo/inject";
import {PipelineContext} from "./context/pipelineContext";
import {IDefinition} from "@appolo/inject";
import {ILogger} from "../interfaces/ILogger";
import {Util as InjectUtil} from "@appolo/inject";
import {Util} from "../util/util";

export class PipelineManager {

    private _methodsOverride: { klass: Function, property: string, old: Function }[] = [];

    constructor(private _injector: Injector, private _app: App) {

    }

    public initialize() {

    }

    public overrideKlassMethods(fn: any, definition: IDefinition) {
        if (!InjectUtil.isClass(fn)) {
            return;
        }

        let metadata = Reflector.getOwnMetadata<IMetadata>(PipeSymbol, fn);

        Object.keys(metadata || {}).forEach(action => {
            this.overrideKlassMethod(metadata[action], fn, definition, action)
        });
    }

    public overrideKlassType(fn: Function, definition: IDefinition, instance?: any) {
        let metadata = Reflector.getOwnMetadata<IPipelineMetadata[]>(PipeKlassRegisterSymbol, fn);

        return this._overrideKlass(metadata, fn, definition)

    }

    public overrideKlassInstance(fn: Function, definition: IDefinition, instance?: any) {
        let metadata = Reflector.getOwnMetadata<IPipelineMetadata[]>(PipeInstanceCreateSymbol, fn);

        return this._overrideKlass(metadata, fn, definition, instance)
    }

    private _overrideKlass(pipelines: IPipelineMetadata[], fn: Function, definition: IDefinition, instance?: any) {
        try {
            if (!pipelines || !pipelines.length) {
                return;
            }

            pipelines = Objects.cloneDeep(pipelines);

            this._convertPipeline(pipelines);

            pipelines = pipelines.reverse();

            let pipesCompiled = runPipes(pipelines);

            return pipesCompiled({definition,injector:this._injector, args: null, instance, type: fn, action: null, argsTypes: []})
        } catch (e) {
            Util.logger(this._app.injector).error("failed to override klass")
        }

    }


    public overrideKlassMethod(pipelines: IPipelineMetadata[], fn: Function, definition: IDefinition, action: string) {

        pipelines = Objects.cloneDeep(pipelines);

        this._convertPipeline(pipelines);


        let old = fn.prototype[action];

        pipelines = pipelines.reverse();

        pipelines.push({
            pipeline: (context: PipelineContext, next: Next) => {

                let fn = old["__PIPELINE__"] ? old["__PIPELINE__"] : old;

                return fn.apply(context.instance, context.arguments)
            }
        });

        let argsTypes = Reflect.getMetadata("design:paramtypes", fn.prototype, action) || [];

        let pipesCompiled = runPipes(pipelines);
        let injector = this._injector;

        fn.prototype[action] = async function () {
            let result = await pipesCompiled({
                definition,
                injector:injector,
                args: arguments,
                instance: this,
                type: fn,
                action,
                argsTypes
            });
            return result;
        };

        fn.prototype[action]["__PIPELINE__"] = old;

        this._methodsOverride.push({klass: fn, property: action, old: old["__PIPELINE__"] ? old["__PIPELINE__"] : old})
    }

    private _convertPipeline(pipes: IPipelineMetadata[]) {
        pipes.forEach((pipe, index) => {
            let id = InjectUtil.getClassId(pipe.pipeline);

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

    public reset() {
        this._methodsOverride.forEach(item => {
            item.klass.prototype[item.property] = item.old;
        })
    }
}
