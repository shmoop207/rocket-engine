import {IOptions} from "./lib/interfaces/IOptions";
import {App} from "./lib/app";
import {Module} from "./lib/modules/module";
import {
    alias,
    aliasFactory,
    define,
    Define,
    factory,
    IDefinition,
    IFactory,
    initMethod,
    inject,
    injectAlias,
    injectAliasFactory,
    injectArray,
    injectDictionary,
    injectFactory,
    injectFactoryMethod,
    injectObjectProperty,
    Injector,
    injectParam,
    injectValue,
    IParamInject,
    lazy,
    override,
    singleton,injectLazy
} from 'appolo-inject'

export {Util} from "./lib/util/util"
export {EventDispatcher} from 'appolo-event-dispatcher';
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
    define, Define, override,injectLazy
}

export {IOptions} from './lib/interfaces/IOptions'
export {IBootstrap} from './lib/interfaces/IBootstrap'
export {IEnv} from './lib/interfaces/IEnv'
export {App} from './lib/app'
export {IApp} from './lib/interfaces/IApp'
export {Module} from './lib/modules/module'
export {Events} from './lib/interfaces/events'
export {IClass, IModuleOptions} from './lib/interfaces/IModuleDefinition'
export {
    mixins, bootstrap, module, throttle, bind, delay, debounce, cache, once, interval
}from './lib/decoretors/decorators'


export let createApp = function (options?: IOptions): App {
    return new App(options);
};





