"use strict";
import {createContainer, Define, InjectDefineSymbol, Injector} from "appolo-inject";
import {IOptions} from "../interfaces/IOptions";
import {Util} from "../util/util";
import {IBootstrap} from "../interfaces/IBootstrap";
import {IEnv} from "../interfaces/IEnv";
import {FilesLoader} from "../loader/filesLoader";
import {ModuleManager} from "../modules/modules";
import {IClass, IExported, IModuleOptions} from "../interfaces/IModuleDefinition";
import {App} from "../app";
import {BootstrapSymbol} from "../decoretors/bootstrapDecorator";
import {Events} from "../interfaces/events";
import {AppModuleOptionsSymbol} from "../decoretors/module";
import {IApp} from "../interfaces/IApp";
import   path = require('path');
import   fs = require('fs');
import    _ = require('lodash');
import {handleAfterDecorator, handleBeforeDecorator} from "../decoretors/beforeDecorator";

export class Launcher {

    protected _options: IOptions;
    protected _env: IEnv;
    protected _injector: Injector;
    protected _moduleManager: ModuleManager;
    protected _app: App;
    private _isInitialized: boolean = false;
    private _files: string[] = [];
    private _exported: IExported[];
    private _moduleOptions: IModuleOptions;

    constructor(app: App) {
        this._app = app;
        this._exported = [];
    }

    protected readonly Defaults = {
        paths: ['src'],
        root: process.cwd(),
        environment: (process.env.NODE_ENV || 'development'),
        bootStrapClassId: 'appolo-bootstrap'
    };


    public loadOptions(options: IOptions): IOptions {

        let opts = _.defaults(options || {}, this.Defaults);

        this._options = opts;
        return opts;

    }

    public loadEnvironments(): IEnv {
        let allPath = path.join(this._options.root, 'config/env/all.js'),
            environmentPath = path.join(this._options.root, 'config/env/', this._options.environment + '.js'),
            env: IEnv = {};

        if (fs.existsSync(allPath)) {

            let all = require(allPath);

            let environment = fs.existsSync(environmentPath) ? require(environmentPath) : {};

            //add current env config to appolo env
            _.defaultsDeep(env, environment || {}, all);
        }

        //save evn name
        env.type = this._options.environment;

        let pkgPath = path.join(this._options.root, 'package.json');

        env.version = fs.existsSync(pkgPath) ? require(pkgPath).version : "";

        //add root
        env.rootDir = this._options.root;

        this._env = env;

        return env;
    }

    public loadInject(): Injector {

        this._injector = createContainer();

        this._injector.addObject("environment", this._env);
        this._injector.addObject("env", this._env);
        this._injector.addObject("inject", this._injector);
        this._injector.addObject("injector", this._injector);


        return this._injector;
    }

    public createModuleManager(): ModuleManager {
        this._moduleManager = new ModuleManager(this._options, this._injector);
        return this._moduleManager
    }


    public async launch(): Promise<void> {

        this._moduleOptions = Reflect.getMetadata(AppModuleOptionsSymbol, this._app) || {};


        if (this._isInitialized) {
            return;
        }

        this._initFiles();

        await this.initStaticModules();

        await this.initDynamicModules();

        if (this._app.parent && !this._moduleOptions.immediate) {
            return;
        }

        await this.initInjector();

        await this.initBootStrap();

        this._isInitialized = true;
    }

    protected async initStaticModules() {
        if (this._isInitialized) {
            return;
        }
        for (let app of this._app.children) {
            await (app as App).launcher.initStaticModules()
        }
        await this._moduleManager.loadStaticModules();
    }

    protected async initDynamicModules() {
        if (this._isInitialized) {
            return;
        }
        for (let app of this._app.children) {
            await (app as App).launcher.initDynamicModules();

        }

        this._app.fireEvent(Events.BeforeModulesLoad);

        await this._moduleManager.loadDynamicModules();

        this._app.fireEvent(Events.ModulesLoaded);
    }

    protected async initInjector() {
        if (this._isInitialized) {
            return;
        }

        await Util.runRegroupByParallel<IApp>(this._app.children, app => (Reflect.getMetadata(AppModuleOptionsSymbol, app) || {}).parallel, app => (app as App).launcher.initInjector())

        this._app.fireEvent(Events.BeforeInjectorInit);


        await this._injector.initialize({
            immediate: this._moduleOptions.immediate,
            parallel: this._moduleOptions.parallel
        });

        this._app.fireEvent(Events.InjectorInit);

    }

    protected async initBootStrap(): Promise<void> {
        if (this._isInitialized) {
            return;
        }

        this._app.fireEvent(Events.BeforeBootstrap);

        await Util.runRegroupByParallel<IApp>(this._app.children, app => (Reflect.getMetadata(AppModuleOptionsSymbol, app) || {}).parallel, app => (app as App).launcher.initBootStrap());

        let bootstrapDef = this._injector.getDefinition(this._options.bootStrapClassId);

        if (!bootstrapDef) {
            this._app.fireEvent(Events.Bootstrap);

            return Promise.resolve();
        }

        let bootstrap = this._injector.getObject<IBootstrap>(this._options.bootStrapClassId);


        await bootstrap.run();

        this._app.fireEvent(Events.Bootstrap);

        this._isInitialized = true;
    }


    private _initFiles() {

        if (this._isInitialized) {
            return;
        }

        for (let app of this._app.children) {
            (app as App).launcher._initFiles()
        }


        let loadPaths = _.union(this._options.paths, this._env.paths);

        for (let filePath of FilesLoader.load(this._options.root, loadPaths)) {
            try {
                let exported: any = require(filePath);

                this._handleExported(exported, filePath);

            } catch (e) {
                console.error(`failed to require ${filePath}`);

                throw e
            }
        }
    }

    private _handleExported(exported: any, filePath: string) {
        let keys = Object.keys(exported);

        for (let i = 0, len = keys.length; i < len; i++) {
            let key = keys[i], fn = exported[key];

            if (!_.isFunction(fn)) {
                continue;
            }

            this._handleFn(fn, filePath);
        }
    }

    private _handleFn(fn: Function, filePath: string) {
        let hasDefine = Reflect.hasMetadata(InjectDefineSymbol, fn);
        let define: Define = null;

        if (hasDefine) {
            this._app.fireEvent(Events.BeforeInjectRegister, fn, filePath);
            define = this._injector.register(fn as IClass, null, filePath);
            this._files.push(filePath);
            this._app.fireEvent(Events.InjectRegister, fn, filePath, define)

        }

        this._exported.push({
            path: filePath,
            fn: fn,
            define
        });

        this._app.fireEvent(Events.ClassExport, fn, filePath);


        if (Reflect.hasMetadata(BootstrapSymbol, fn)) {
            this._options.bootStrapClassId = Util.getClassName(fn);
        }

        handleBeforeDecorator(fn, this._app);
        handleAfterDecorator(fn, this._app);

    }

    public get exported() {
        return this._exported;
    }

    public reset() {
        this._exported = [];

        _.forEach(this._files, file => delete require.cache[file]);

        for (let filePath of FilesLoader.load(this._options.root, ["config"])) {
            delete require.cache[filePath]
        }

        this._files.length = 0;
        this._app = null;
    }

}


