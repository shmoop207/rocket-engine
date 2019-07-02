"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pipeline_1 = require("../decoretors/pipeline");
const pipelineRunner_1 = require("./pipelineRunner");
const util_1 = require("../util/util");
const reflector_1 = require("../util/reflector");
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
        let metadata = reflector_1.Reflector.getOwnMetadata(pipeline_1.PipeSymbol, fn);
        _.forEach(metadata, (pipelines, action) => {
            this.overrideMethod(pipelines, fn, action);
        });
    }
    overrideMethod(pipelines, fn, action) {
        pipelines = _.cloneDeep(pipelines);
        this._convertPipeline(pipelines);
        let old = fn.prototype[action];
        pipelines = pipelines.reverse();
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
            let injector = this._injector;
            pipe.pipeline = (context, next) => {
                let pipeline = injector.get(id);
                return pipeline.run(context, next);
            };
        });
    }
}
exports.PipelineManager = PipelineManager;
//# sourceMappingURL=pipelineManager.js.map