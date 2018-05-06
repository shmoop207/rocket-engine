"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../index");
const decorators_1 = require("../decorators");
const util_1 = require("../util/util");
const _ = require("lodash");
class Module {
    constructor(options) {
        this._moduleOptions = options || {};
    }
    get exports() {
        return this._exports;
    }
    get imports() {
        return this._imports;
    }
    get moduleOptions() {
        return this._moduleOptions;
    }
    async initialize(parent, plugins) {
        this._moduleDefinition = Reflect.getMetadata(decorators_1.ModuleSymbol, this.constructor);
        if (!this._moduleDefinition) {
            return;
        }
        this._setDefinitions();
        this._app = this._createApp(parent, this._moduleDefinition);
        await this._loadInnerModules(this._app, this._moduleDefinition, plugins);
        this._handleExports(this._app);
        this._handleImports(this._app);
        this._handlePlugins(this._exports, plugins);
        await this._app.launch();
    }
    _setDefinitions() {
        if (this._moduleDefinition.options) {
            _.extend(this._moduleOptions, this._moduleDefinition.options);
        }
        if (this._moduleDefinition.exports) {
            this._exports = this._moduleDefinition.exports;
        }
        if (this._moduleDefinition.imports) {
            this._imports = this._moduleDefinition.imports;
        }
    }
    _createApp(parent, moduleDefinition) {
        let rootEnv = parent.getObject("env");
        let app = index_1.createApp({
            root: moduleDefinition.root,
            immediate: moduleDefinition.immediate,
            environment: rootEnv.type
        });
        app.injector.addObject("rootEnv", rootEnv, true);
        app.injector.addObject("env", _.extend({}, rootEnv, app.env), true);
        app.injector.addObject("moduleOptions", this._moduleOptions, true);
        app.injector.parent = parent;
        app.parent = parent.get('app');
        return app;
    }
    async _loadInnerModules(app, moduleDefinition, plugins) {
        if (!moduleDefinition.modules) {
            return;
        }
        for (let module of moduleDefinition.modules) {
            let moduleInstance = module instanceof Module ? module : new module;
            await moduleInstance.initialize(app.injector, plugins);
        }
    }
    _handleExports(app) {
        _.forEach(this.exports, item => {
            if (typeof item == "function") {
                app.injector.parent.addDefinition(util_1.Util.getClassNameOrId(item), { injector: app.injector });
            }
            else {
                app.injector.parent.addDefinition(item.id, {
                    injector: app.injector,
                    refName: util_1.Util.getClassNameOrId(item.type)
                });
            }
        });
    }
    _handleImports(app) {
        _.forEach(this.imports, item => {
            if (typeof item == "function") {
                //app.injector.addDefinition(Util.getClassNameOrId(item as Class), {injector: app.injector})
            }
            else {
                app.injector.addDefinition(util_1.Util.getClassNameOrId(item.type), {
                    injector: app.injector.parent,
                    refName: item.id
                });
            }
        });
    }
    _handlePlugins(exports, plugins) {
        _.forEach(exports, item => _.isFunction(item) && _.forEach(plugins, plugin => plugin(item)));
    }
}
exports.Module = Module;
//# sourceMappingURL=module.js.map