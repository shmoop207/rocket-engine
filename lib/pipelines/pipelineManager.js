"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pipeline_1 = require("../decoretors/pipeline");
const pipelineRunner_1 = require("./pipelineRunner");
const util_1 = require("../util/util");
const appolo_utils_1 = require("appolo-utils");
const appolo_utils_2 = require("appolo-utils");
class PipelineManager {
    constructor(_injector, _app) {
        this._injector = _injector;
        this._app = _app;
        this._methodsOverride = [];
    }
    initialize() {
    }
    handleExport(fn, definition) {
        if (!util_1.Util.isClass(fn)) {
            return;
        }
        let metadata = appolo_utils_1.Reflector.getOwnMetadata(pipeline_1.PipeSymbol, fn);
        Object.keys(metadata || {}).forEach(action => {
            this.overrideMethod(metadata[action], fn, definition, action);
        });
    }
    overrideKlassRegister(fn, definition, instance) {
        let metadata = appolo_utils_1.Reflector.getOwnMetadata(pipeline_1.PipeKlassRegisterSymbol, fn);
        this.overrideKlass(metadata, fn, definition);
    }
    overrideInstanceCreate(fn, definition, instance) {
        let metadata = appolo_utils_1.Reflector.getOwnMetadata(pipeline_1.PipeInstanceCreateSymbol, fn);
        this.overrideKlass(metadata, fn, definition, instance);
    }
    overrideKlass(pipelines, fn, definition, instance) {
        try {
            if (!pipelines || !pipelines.length) {
                return;
            }
            pipelines = appolo_utils_2.Objects.cloneDeep(pipelines);
            this._convertPipeline(pipelines);
            pipelines = pipelines.reverse();
            let pipesCompiled = pipelineRunner_1.runPipes(pipelines);
            return pipesCompiled({ definition, args: null, instance, type: fn, action: null, argsTypes: [] });
        }
        catch (e) {
            //TODO handle Error
        }
    }
    overrideMethod(pipelines, fn, definition, action) {
        pipelines = appolo_utils_2.Objects.cloneDeep(pipelines);
        this._convertPipeline(pipelines);
        let old = fn.prototype[action];
        pipelines = pipelines.reverse();
        pipelines.push({
            pipeline: (context, next) => {
                let fn = old["__PIPELINE__"] ? old["__PIPELINE__"] : old;
                return fn.apply(context.instance, context.arguments);
            }
        });
        let argsTypes = Reflect.getMetadata("design:paramtypes", fn.prototype, action);
        let pipesCompiled = pipelineRunner_1.runPipes(pipelines);
        fn.prototype[action] = async function () {
            let result = await pipesCompiled({
                definition,
                args: arguments,
                instance: this,
                type: fn,
                action,
                argsTypes
            });
            return result;
        };
        fn.prototype[action]["__PIPELINE__"] = old;
        this._methodsOverride.push({ klass: fn, property: action, old: old["__PIPELINE__"] ? old["__PIPELINE__"] : old });
    }
    _convertPipeline(pipes) {
        pipes.forEach((pipe, index) => {
            let id = util_1.Util.getClassId(pipe.pipeline);
            if (!id) {
                return;
            }
            let injector = this._injector;
            pipe.pipeline = (context, next) => {
                let pipeline = injector.get(id);
                return pipeline.run(context, next);
            };
        });
    }
    reset() {
        this._methodsOverride.forEach(item => {
            item.klass.prototype[item.property] = item.old;
        });
    }
}
exports.PipelineManager = PipelineManager;
//# sourceMappingURL=pipelineManager.js.map