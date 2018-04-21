"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appolo_inject_1 = require("appolo-inject");
const path = require("path");
const fs = require("fs");
const _ = require("lodash");
const util_1 = require("../util/util");
const filesLoader_1 = require("../loader/filesLoader");
const decorators_1 = require("../decorators");
const modules_1 = require("../modules/modules");
class Launcher {
    constructor() {
        this._plugins = [];
        this.Defaults = {
            paths: ['src'],
            root: process.cwd(),
            environment: (process.env.NODE_ENV || 'development'),
            bootStrapClassId: 'appolo-bootstrap'
        };
    }
    loadOptions(options) {
        let opts = _.defaults(options || {}, this.Defaults);
        this._options = opts;
        return opts;
    }
    loadEnvironments() {
        let allPath = path.join(this._options.root, 'config/env/all.js'), environmentPath = path.join(this._options.root, 'config/env/', this._options.environment + '.js'), env = {};
        if (fs.existsSync(allPath)) {
            let all = require(allPath);
            let environment = fs.existsSync(environmentPath) ? require(environmentPath) : {};
            //add current env config to appolo env
            _.defaultsDeep(env, environment || {}, all);
            //save evn name
            env.type = this._options.environment;
            let pkgPath = path.join(this._options.root, 'package.json');
            env.version = fs.existsSync(pkgPath) ? require(pkgPath).version : "";
            //add root
            env.rootDir = this._options.root;
        }
        this._env = env;
        return env;
    }
    loadInject() {
        this._injector = appolo_inject_1.createContainer();
        this._injector.addObject("environment", this._env);
        this._injector.addObject("env", this._env);
        this._injector.addObject("inject", this._injector);
        this._injector.addObject("injector", this._injector);
        return this._injector;
    }
    createModuleManager() {
        this._moduleManager = new modules_1.ModuleManager(this._options, this._injector);
        return this._moduleManager;
    }
    async launch() {
        await this._moduleManager.loadStaticModules();
        this._loadFiles();
        await this._moduleManager.loadDynamicModules(this._plugins);
        await this._injector.initialize();
        await this._loadBootStrap();
    }
    _loadFiles() {
        let loadPaths = _.union(this._options.paths, this._env.paths);
        for (let filePath of filesLoader_1.FilesLoader.load(this._options.root, loadPaths)) {
            try {
                let exported = require(filePath);
                this._handleExported(exported);
            }
            catch (e) {
                console.error(`failed to require ${filePath}`);
                throw e;
            }
        }
    }
    _handleExported(exported) {
        let keys = Object.keys(exported);
        for (let i = 0, len = keys.length; i < len; i++) {
            let key = keys[i], fn = exported[key];
            if (!_.isFunction(fn)) {
                continue;
            }
            this._handleFn(fn);
        }
    }
    _handleFn(fn) {
        let define = Reflect.hasMetadata(appolo_inject_1.InjectDefineSymbol, fn);
        if (define) {
            this._injector.register(fn);
        }
        if (Reflect.hasMetadata(decorators_1.BootstrapSymbol, fn)) {
            this._options.bootStrapClassId = util_1.Util.getClassName(fn);
        }
        //run plugins;
        for (let i = 0, len = this._plugins.length; i < len; i++) {
            this._plugins[i](fn);
        }
    }
    get plugins() {
        return this._plugins;
    }
    async _loadBootStrap() {
        let bootstrapDef = this._injector.getDefinition(this._options.bootStrapClassId);
        if (!bootstrapDef) {
            return Promise.resolve();
        }
        let bootstrap = this._injector.getObject(this._options.bootStrapClassId);
        await bootstrap.run();
    }
}
exports.Launcher = Launcher;
//# sourceMappingURL=launcher.js.map