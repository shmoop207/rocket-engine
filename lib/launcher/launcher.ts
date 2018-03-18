"use strict";
import {Injector, createContainer, InjectDefineSymbol} from "rocket-inject";

import   path = require('path');
import   fs = require('fs');
import    _ = require('lodash');
import    Q = require('bluebird');
import {IOptions} from "../IOptions";
import {Util} from "../util/util";
import {IBootstrap} from "../IBootstrap";
import {App} from "../app";
import {IEnv} from "../IEnv";
import {FilesLoader} from "../loader/filesLoader";
import {BootstrapSymbol} from "../decorators";

export class Launcher {

    constructor(protected app: App) {

    }

    protected static Defaults = {
        paths: ['config', 'server'],
        root: process.cwd(),
        environment: (process.env.NODE_ENV || 'development'),
        bootStrapClassId: 'appolo-bootstrap'
    };


    public static loadOptions(options: IOptions): IOptions {

        return _.defaults( options || {},this.Defaults);

    }

    public static loadEnvironments(options: IOptions): IEnv {
        let allPath = path.join(options.root, 'config/environments/all.js'),
            environmentPath = path.join(options.root, 'config/environments/', options.environment + '.js'),
            env: IEnv = {};

        if (fs.existsSync(allPath)) {

            let all = require(allPath);

            let environment = fs.existsSync(environmentPath) ? require(environmentPath) : {};

            //add current env config to appolo env
            _.defaultsDeep(env, environment || {}, all);

            //save evn name
            env.type = options.environment;

            let pkg = require(path.join(options.root, 'package.json'));

            env.version = pkg ? pkg.version : "";

            //add root
            env.rootDir = options.root;

        }

        return env;

    }

    public async launch() :Promise<void>{

        await this._loadModules(this.app.options, this.app.injector);

        this._loadFiles(this.app.options, this.app.env, this.app.injector);


        await this.app.injector.initialize({
            root: this.app.options.root
        });

        await this._loadBootStrap(this.app.options, this.app.injector);
    }

    private async _loadModules(options: IOptions, injector: Injector): Promise<void> {
        let modulesPath = path.join(options.root, 'config/modules/modules.js');

        if (!fs.existsSync(modulesPath)) {
            return;
        }
        let modulesFunc = require(modulesPath);

        if (!_.isFunction(modulesFunc)) {
            return;
        }
        let args = Util.getFunctionArgs(modulesFunc as any);

        let dependencies = _.map(args, (arg) => injector.getObject(arg));

        let result = modulesFunc.apply(modulesFunc, dependencies);

        //check for promise
        if (result && result.then) {
            await result;
        }
    }

    private _loadFiles(options: IOptions, env: IEnv, injector: Injector) {
        let loadPaths = _.union(options.paths, env.paths);

        //load env files
        for (let filePath of FilesLoader.load(options.root, loadPaths)) {
            try {
                let exported: any = require(filePath);

                let keys = Object.keys(exported);

                for (let i = 0, len = keys.length; i < len; i++) {
                    let key = keys[i];
                    let fn = exported[key];

                    if (!_.isFunction(fn)) {
                        continue;
                    }

                    this._handleKlass(fn);

                }
            } catch (e) {
                console.error(`failed to require ${filePath}`);

                throw e
            }
        }
    }

    private _handleKlass(fn: Function) {
        let define = Reflect.hasMetadata(InjectDefineSymbol, fn)

        if (define) {
            this.app.injector.register(fn)
        }

        if (Reflect.hasMetadata(BootstrapSymbol, fn)) {
            this.app.options.bootStrapClassId = Util.getClassName(fn);
        }

    }

    private async _loadBootStrap(options: IOptions, injector: Injector): Promise<void> {

        let bootstrapDef = injector.getDefinition(options.bootStrapClassId);

        if (!bootstrapDef) {
            return Promise.resolve();
        }

        let bootstrap = injector.getObject<IBootstrap>(options.bootStrapClassId);

        await bootstrap.run();
    }


    // public reset(isSoftReset?: boolean): void {
    //
    //     if (!isSoftReset) {
    //         _.forEach(this.cachedRequire, function (filePath) {
    //             delete require.cache[filePath];
    //         });
    //
    //         moduleManager.reset();
    //     }
    //
    //     this.cachedRequire.length = 0;
    //
    //     this._options = null;
    //
    //     _.forEach(environments, function (value, key) {
    //         delete environments[key];
    //     });
    //
    //     let definitions = inject.getDefinitions();
    //
    //     inject.reset();
    //
    //     if (isSoftReset) {
    //         inject.addDefinitions(definitions);
    //     }
    //
    //     process.removeAllListeners();
    // }
    //
    // public softReset() {
    //
    //     this.reset(true);
    // }


}


