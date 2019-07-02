"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pipeline_1 = require("../decoretors/pipeline");
const pipelineRunner_1 = require("./pipelineRunner");
const util_1 = require("../util/util");
const __1 = require("../../");
const _ = require("lodash");
class PipelineManager {
    constructor(_injector, _app) {
        this._injector = _injector;
        this._app = _app;
    }
    initialize() {
    }
    handleExport(fn) {
        if (!util_1.Util.isClass(fn)) {
            return;
        }
        let metadata = util_1.Util.getReflectData(pipeline_1.PipeSymbol, fn);
        _.forEach(metadata, (pipelines, action) => {
            this.overrideMethod(pipelines, fn, action);
        });
    }
    overrideMethod(pipelines, fn, action) {
        let old = fn.prototype[action];
        if (Reflect.hasOwnMetadata(pipeline_1.PipeSetSymbol, fn, action) || !__1.Util.getClassDefinition(fn)) {
            return;
        }
        Reflect.defineMetadata(pipeline_1.PipeSetSymbol, pipelines, fn, action);
        pipelines = pipelines.reverse();
        this._convertPipeline(pipelines);
        pipelines.push({
            pipeline: (context, next) => {
                return old.apply(context.instance, context.arguments);
            }
        });
        let argsTypes = Reflect.getMetadata("design:paramtypes", fn.prototype, action);
        let pipesCompiled = pipelineRunner_1.runPipes(pipelines);
        fn.prototype[action] = async function () {
            let result = await pipesCompiled({ args: arguments, instance: this, type: fn, action, argsTypes });
            return result;
        };
    }
    _convertPipeline(pipes) {
        _.forEach(pipes, (pipe, index) => {
            let id = util_1.Util.getClassId(pipe.pipeline);
            if (!id) {
                return;
            }
            pipe.pipeline = (context, next) => {
                let pipeline = this._injector.get(id);
                return pipeline.run(context, next);
            };
        });
    }
}
exports.PipelineManager = PipelineManager;
//# sourceMappingURL=pipelineManager.js.map