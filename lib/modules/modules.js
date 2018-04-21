"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Q = require("bluebird");
const _ = require("lodash");
const path = require("path");
const util_1 = require("../util/util");
const module_1 = require("./module");
const decorators_1 = require("../decorators");
class ModuleManager {
    constructor(_options, _injector) {
        this._options = _options;
        this._injector = _injector;
        this._modules = [];
    }
    async loadDynamicModules(plugins) {
        for (let module of this._modules) {
            let moduleInstance = module instanceof module_1.Module ? module : new module;
            await moduleInstance.initialize(this._injector, plugins);
        }
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
    async loadStaticModules() {
        let modulesPath = path.join(this._options.root, 'modules/modules.js');
        await util_1.Util.loadPathWithArgs([modulesPath], this._injector);
    }
}
exports.ModuleManager = ModuleManager;
//# sourceMappingURL=modules.js.map