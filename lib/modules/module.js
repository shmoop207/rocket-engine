"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../index");
const decorators_1 = require("../decorators");
const util_1 = require("../util/util");
const _ = require("lodash");
class Module {
    constructor(options) {
        this._exports = [];
        this._options = options || {};
    }
    get exports() {
        return this._exports;
    }
    async initialize(parent, plugins) {
        this._moduleDefinition = Reflect.getMetadata(decorators_1.ModuleSymbol, this.constructor);
        if (!this._moduleDefinition) {
            return;
        }
        if (this._moduleDefinition.options) {
            _.extend(this._options, this._moduleDefinition.options);
        }
        if (this._moduleDefinition.exports) {
            this._exports = this._moduleDefinition.exports;
        }
        this._app = this._createApp(parent, this._moduleDefinition);
        _.forEach(plugins, plugin => this._app.plugin(plugin));
        await this._loadImports(this._app, this._moduleDefinition, plugins);
        this._handleExports(this._app);
        await this._app.launch();
    }
    _createApp(parent, moduleDefinition) {
        let app = index_1.createApp({ root: moduleDefinition.root });
        app.injector.addObject("env", parent.getObject("env"), true);
        app.injector.addObject("moduleOptions", this._options, true);
        app.injector.parent = parent;
        return app;
    }
    async _loadImports(app, moduleDefinition, plugins) {
        if (!moduleDefinition.imports) {
            return;
        }
        for (let module of moduleDefinition.imports) {
            let moduleInstance = module instanceof Module ? module : new module;
            await moduleInstance.initialize(app.injector, plugins);
        }
    }
    _handleExports(app) {
        _.forEach(this.exports, item => {
            let id = util_1.Util.getClassNameOrId(item);
            app.injector.parent.addDefinition(id, { injector: app.injector });
        });
    }
}
exports.Module = Module;
//# sourceMappingURL=module.js.map