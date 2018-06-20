import {IOptions} from "./lib/interfaces/IOptions";
import {App} from "./lib/app";
import {Module} from "./lib/modules/module";

export {Util} from "./lib/util/util"
export {EventDispatcher} from './lib/events/event-dispatcher';
export {Launcher} from './lib/launcher/launcher';
export {FilesLoader} from './lib/loader/filesLoader';
export {
    Injector,
    singleton,
    factory,
    inject,
    initMethod,
    injectParam,
    injectFactory,
    IDefinition,
    IFactory,
    injectFactoryMethod,
    alias,
    aliasFactory,
    injectValue,
    injectObjectProperty,
    injectDictionary,
    injectArray,
    injectAlias,
    lazy,
    injectAliasFactory,
    IParamInject,
    define, Define,override
} from 'appolo-inject'
export {IOptions} from './lib/interfaces/IOptions'
export {IBootstrap} from './lib/interfaces/IBootstrap'
export {IEnv} from './lib/interfaces/IEnv'
export {App} from './lib/app'
export {IApp} from './lib/interfaces/IApp'
export {Module} from './lib/modules/module'
export {IClass} from './lib/interfaces/IModuleDefinition'
export {mixins, bootstrap, module} from './lib/decorators'


export let createApp = function (options?: IOptions): App {
    return new App(options);
};





