"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const rocket_inject_1 = require("rocket-inject");
const path = require("path");
const fs = require("fs");
const _ = require("lodash");
const util_1 = require("../util/util");
const filesLoader_1 = require("../loader/filesLoader");
const decorators_1 = require("../decorators");
class Launcher {
    constructor(app) {
        this.app = app;
    }
    static loadOptions(options) {
        return _.defaults(options || {}, this.Defaults);
    }
    static loadEnvironments(options) {
        let allPath = path.join(options.root, 'config/environments/all.js'), environmentPath = path.join(options.root, 'config/environments/', options.environment + '.js'), env = {};
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
    launch() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this._loadModules(this.app.options, this.app.injector);
            this._loadFiles(this.app.options, this.app.env, this.app.injector);
            yield this.app.injector.initialize({
                root: this.app.options.root
            });
            yield this._loadBootStrap(this.app.options, this.app.injector);
        });
    }
    _loadModules(options, injector) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let modulesPath = path.join(options.root, 'config/modules/modules.js');
            if (!fs.existsSync(modulesPath)) {
                return;
            }
            let modulesFunc = require(modulesPath);
            if (!_.isFunction(modulesFunc)) {
                return;
            }
            let args = util_1.Util.getFunctionArgs(modulesFunc);
            let dependencies = _.map(args, (arg) => injector.getObject(arg));
            let result = modulesFunc.apply(modulesFunc, dependencies);
            //check for promise
            if (result && result.then) {
                yield result;
            }
        });
    }
    _loadFiles(options, env, injector) {
        let loadPaths = _.union(options.paths, env.paths);
        //load env files
        for (let filePath of filesLoader_1.FilesLoader.load(options.root, loadPaths)) {
            try {
                let exported = require(filePath);
                let keys = Object.keys(exported);
                for (let i = 0, len = keys.length; i < len; i++) {
                    let key = keys[i];
                    let fn = exported[key];
                    if (!_.isFunction(fn)) {
                        continue;
                    }
                    this._handleKlass(fn);
                }
            }
            catch (e) {
                console.error(`failed to require ${filePath}`);
                throw e;
            }
        }
    }
    _handleKlass(fn) {
        let define = Reflect.hasMetadata(rocket_inject_1.InjectDefineSymbol, fn);
        if (define) {
            this.app.injector.register(fn);
        }
        if (Reflect.hasMetadata(decorators_1.BootstrapSymbol, fn)) {
            this.app.options.bootStrapClassId = util_1.Util.getClassName(fn);
        }
    }
    _loadBootStrap(options, injector) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let bootstrapDef = injector.getDefinition(options.bootStrapClassId);
            if (!bootstrapDef) {
                return Promise.resolve();
            }
            let bootstrap = injector.getObject(options.bootStrapClassId);
            yield bootstrap.run();
        });
    }
}
Launcher.Defaults = {
    paths: ['config', 'server'],
    root: process.cwd(),
    environment: (process.env.NODE_ENV || 'development'),
    bootStrapClassId: 'appolo-bootstrap'
};
exports.Launcher = Launcher;
//# sourceMappingURL=launcher.js.map