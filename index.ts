import "reflect-metadata";
import {IOptions} from './lib/interfaces/IOptions';
import {App} from "./lib/app/app";
import {Module} from "./lib/modules/module";

export {IGuard} from "./lib/pipelines/guards/interfaces/IGuard";
export {guard} from "./lib/pipelines/guards/decorators/guardDecorator"

export {IInterceptor} from "./lib/pipelines/interceptors/interfaces/IInterceptor";
export {intercept} from "./lib/pipelines/interceptors/decorators/interceptorDecorator";

export {IPipe} from "./lib/pipelines/pipes/interfaces/IPipe";
export {pipe} from "./lib/pipelines/pipes/decorators/pipeDecorator";

export {bootstrap} from "./lib/bootstrap/bootstrapDecorator"
export {before,after} from "./lib/decoretors/propertyDecorators"
export {module} from "./lib/modules/decoreators/moduleDecorators"
export {pipeline,pipelineInstance,pipelineType,pipelineDecorator} from "./lib/pipelines/decoreators/pipelineDecorators"

export {Util} from "./lib/util/util";
export {Launcher} from './lib/launcher/launcher';
export {Discovery} from './lib/discovery/discovery';
export {FilesLoader} from './lib/loader/filesLoader';


export {IOptions} from './lib/interfaces/IOptions';
export {IBootstrap} from './lib/bootstrap/IBootstrap';
export {IEnv} from './lib/interfaces/IEnv';
export {IEnv as AppoloEnv} from './lib/interfaces/IEnv';
export {App} from './lib/app/app';
export {IApp} from './lib/app/IApp';
export {Module} from './lib/modules/module';
export {Modules} from './lib/modules/modules';
export {Events} from './lib/events/events';
export {IEvents} from './lib/events/IEvents';
export {IDiscovery} from './lib/discovery/IDiscovery';
export {IModules} from './lib/modules/interfaces/IModules';
export {ITree} from './lib/tree/ITree';
export {IClass, IModuleOptions, IModuleParams, ModuleArg} from './lib/modules/interfaces/IModule';
export {IPipeline, IPipelineFn} from './lib/pipelines/interfaces/IPipeline';
export {PipelineContext} from './lib/pipelines/context/pipelineContext';



export let createApp = function (options?: IOptions): App {
    return new App(options);
};





