import {IOptions} from './lib/interfaces/IOptions';
import {App} from "./lib/app";
import {Module} from "./lib/modules/module";


export {Util} from "./lib/util/util";
export {Launcher} from './lib/launcher/launcher';
export {Discovery} from './lib/discovery/discovery';
export {FilesLoader} from './lib/loader/filesLoader';


export {IOptions} from './lib/interfaces/IOptions';
export {IBootstrap} from './lib/interfaces/IBootstrap';
export {IEnv} from './lib/interfaces/IEnv';
export {IEnv as AppoloEnv} from './lib/interfaces/IEnv';
export {App} from './lib/app';
export {IApp} from './lib/interfaces/IApp';
export {Module} from './lib/modules/module';
export {Modules} from './lib/modules/modules';
export {Events} from './lib/events/events';
export {IEvents} from './lib/interfaces/IEvents';
export {IDiscovery} from './lib/interfaces/IDiscovery';
export {IModules} from './lib/interfaces/IModules';
export {ITree} from './lib/interfaces/ITree';
export {IClass, IModuleOptions, IModuleParams, ModuleArg} from './lib/interfaces/IModule';
export {IPipeline, IPipelineFn} from './lib/pipelines/IPipeline';
export {PipelineContext} from './lib/pipelines/pipelineContext';
export {
    bootstrap,
    module,
    before,
    after,
    pipeline,
    pipelineInstance,
    pipelineType
} from './lib/decoretors/decorators';


export let createApp = function (options?: IOptions): App {
    return new App(options);
};





