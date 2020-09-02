import {IOptions} from "./lib/interfaces/IOptions";
import {App} from "./lib/app";
import {Module} from "./lib/modules/module";


export {Util} from "./lib/util/util"
export {Launcher} from './lib/launcher/launcher';
export {Discovery} from './lib/launcher/discovery';
export {FilesLoader} from './lib/loader/filesLoader';


export {IOptions} from './lib/interfaces/IOptions'
export {IBootstrap} from './lib/interfaces/IBootstrap'
export {IEnv} from './lib/interfaces/IEnv'
export {App} from './lib/app'
export {IApp} from './lib/interfaces/IApp'
export {Module} from './lib/modules/module'
export {Events} from './lib/interfaces/events'
export {IClass, IModuleOptions} from './lib/interfaces/IModule'
export {IPipeline, IPipelineFn} from './lib/pipelines/IPipeline'
export {PipelineContext} from './lib/pipelines/pipelineContext'
export {
    bootstrap,
    module,
    before,
    after,
    pipeline,
    pipelineInstance,
    pipelineType
} from './lib/decoretors/decorators'


export let createApp = function (options?: IOptions): App {
    return new App(options);
};





