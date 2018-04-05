import {IOptions} from "./lib/IOptions";
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
    injectAliasFactory,
    IParamInject,
    define
} from 'appolo-inject'
export {IOptions} from './lib/IOptions'
export {IBootstrap} from './lib/IBootstrap'
export {IEnv} from './lib/IEnv'
export {App} from './lib/app'
export {Module} from './lib/modules/module'
export {mixins, bootstrap,module} from './lib/decorators'


export let create = function (options: IOptions): App {
    return new App(options);
};





