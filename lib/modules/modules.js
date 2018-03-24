"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Q = require("bluebird");
const _ = require("lodash");
const util_1 = require("../util/util");
const module_1 = require("./module");
const decorators_1 = require("../decorators");
const path = require("path");
const fs = require("fs");
const appModule_1 = require("./appModule");
class ModuleManager {
    constructor(_options, _injector) {
        this._options = _options;
        this._injector = _injector;
        this._modules = [];
    }
    loadDynamicModules() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let appModule = new appModule_1.AppModule(this._injector, this._modules);
            yield appModule.initialize();
        });
    }
    load(moduleFn) {
        if (moduleFn instanceof module_1.Module || Reflect.hasMetadata(decorators_1.ModuleSymbol, moduleFn)) {
            this._modules.push(moduleFn);
            return;
        }
        //remove the callback arg
        let args = util_1.Util.getFunctionArgs(moduleFn), lastArg = _.last(args), isCallback = false;
        if (_.includes(['callback', 'next', 'fn', 'func'], lastArg)) {
            args = _.initial(args);
            isCallback = true;
        }
        let dependencies = _.map(args, (arg) => this._injector.getObject(arg));
        if (isCallback) {
            return Q.fromCallback((callback) => moduleFn.apply(moduleFn, dependencies.concat([callback])));
        }
        return Q.try(() => moduleFn.apply(moduleFn, dependencies));
    }
    loadStaticModules() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let modulesPath = path.join(this._options.root, 'config/modules/modules.js');
            if (!fs.existsSync(modulesPath)) {
                return;
            }
            let modulesFunc = require(modulesPath);
            if (!_.isFunction(modulesFunc)) {
                return;
            }
            let args = util_1.Util.getFunctionArgs(modulesFunc);
            let dependencies = _.map(args, (arg) => this._injector.getObject(arg));
            let result = modulesFunc.apply(modulesFunc, dependencies);
            //check for promise
            if (result && result.then) {
                yield result;
            }
        });
    }
}
exports.ModuleManager = ModuleManager;
//# sourceMappingURL=modules.js.map