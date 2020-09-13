"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModuleLoader = void 0;
const inject_1 = require("@appolo/inject");
const events_1 = require("../interfaces/events");
const index_1 = require("../../index");
const moduleDecorators_1 = require("../decoretors/moduleDecorators");
const utils_1 = require("@appolo/utils");
const inject_2 = require("@appolo/inject");
const util_1 = require("../util/util");
class ModuleLoader {
    constructor(_moduleParams, _parenInjector) {
        var _a, _b;
        this._moduleParams = _moduleParams;
        this._parenInjector = _parenInjector;
        this._moduleDefinition = {};
        this._moduleOptions = {};
        this._moduleDefinition = Reflect.getMetadata(moduleDecorators_1.ModuleSymbol, _moduleParams.module);
        if (!this._moduleDefinition) {
            throw new Error(`failed to find moduleDefinition for ${_moduleParams.module}`);
        }
        this._moduleOptions = utils_1.Objects.defaults({}, _moduleParams.moduleOptions, {
            immediate: (_a = this._moduleDefinition) === null || _a === void 0 ? void 0 : _a.immediate,
            parallel: (_b = this._moduleDefinition) === null || _b === void 0 ? void 0 : _b.parallel
        }, { immediate: false, parallel: false });
    }
    get module() {
        return this._module;
    }
    get moduleOptions() {
        return this.module.moduleOptions;
    }
    preInitialize() {
        if (!this._moduleDefinition) {
            return;
        }
        let app = this._createApp(this._parenInjector, this._moduleDefinition);
        this._module = app.injector.get(this._moduleParams.module);
        this._setDefinitions();
        this._module.app = app;
        this._module.moduleOptions = utils_1.Objects.defaults({}, this._moduleParams.options || {}, this._module.defaults);
        this._module.app.injector.addObject("moduleOptions", this._module.moduleOptions, true);
        this._handleFileExport();
    }
    async initialize() {
        try {
            await this._module.beforeInitialize();
            // await this._loadInnerModules(this._module.app, this._moduleDefinition);
            this._handleExports(this._module.app);
            this._handleImports(this._module.app);
            await this._module.beforeLaunch();
            this._fireClassExportEvents();
            await this._module.app.launch();
            await this._module.afterInitialize();
        }
        catch (e) {
            util_1.Util.logger(this._parenInjector).error(`failed to initialize module ${this._module.constructor.name}`, { e: e.stack });
            throw e;
        }
    }
    async afterLaunch() {
        await this._module.afterLaunch();
    }
    _fireClassExportEvents() {
        if (!this._module.app.hasListener(events_1.Events.ClassExport) && !this._module.app.hasListener(events_1.Events.InjectRegister)) {
            return;
        }
        this._module.app.parent.discovery.exported.forEach(item => {
            if (Reflect.hasMetadata(inject_1.InjectDefineSymbol, item.fn)) {
                this._module.app.fireEvent(events_1.Events.InjectRegister, item.fn, item.path);
            }
            this._module.app.fireEvent(events_1.Events.ClassExport, item.fn, item.path);
        });
    }
    _setDefinitions() {
        if (this._moduleDefinition.options) {
            Object.assign(this._module.moduleOptions, this._moduleDefinition.options);
        }
    }
    _createApp(parent, moduleDefinition) {
        let rootEnv = parent.getObject("env");
        let app = index_1.createApp({
            root: moduleDefinition.root,
            environment: rootEnv.type
        });
        app.injector.addObject("rootEnv", rootEnv, true);
        app.injector.addObject("env", Object.assign({}, rootEnv, app.env), true);
        Reflect.defineMetadata(moduleDecorators_1.AppModuleOptionsSymbol, this._moduleOptions, app);
        app.injector.parent = parent;
        app.parent = parent.get('app');
        app.register(this._moduleParams.module);
        return app;
    }
    // private async _loadInnerModules(app: IApp, moduleDefinition: IModuleDefinition) {
    //
    //     if (!moduleDefinition.modules) {
    //         return;
    //     }
    //
    //     for (let module of moduleDefinition.modules) {
    //         let moduleInstance = module instanceof Module ? module : new (module as typeof Module);
    //
    //         let moduleLoader = new ModuleLoader(moduleInstance, app.injector);
    //
    //         moduleLoader.preInitialize();
    //
    //         await moduleLoader.initialize();
    //     }
    // }
    _handleExports(app) {
        let moduleExports = [].concat(this._module.exports);
        if (this._moduleDefinition.exports && this._moduleDefinition.exports.length) {
            moduleExports.push(...this._moduleDefinition.exports);
        }
        moduleExports.forEach(item => {
            let id, type;
            if (typeof item == "function") {
                id = inject_2.Util.getClassNameOrId(item);
                type = item;
                app.injector.parent.addDefinition(id, { injector: app.injector });
            }
            else {
                id = item.id;
                type = item.type;
                app.injector.parent.addDefinition(item.id, {
                    injector: app.injector,
                    refName: inject_2.Util.getClassNameOrId(item.type)
                });
            }
            this._module.app.fireEvent(events_1.Events.ModuleExport, type, id);
            this._module.app.parent && (this._module.app.parent.fireEvent(events_1.Events.ModuleExport, type, id));
        });
    }
    _handleFileExport() {
        this._module.fileExports.forEach(fn => {
            this._module.app.parent.discovery.addExported({ path: "", fn, define: inject_2.Util.getClassDefinition(fn) });
        });
    }
    _handleImports(app) {
        let moduleImports = [].concat(this._module.imports);
        if (this._moduleDefinition.imports && this._moduleDefinition.imports.length) {
            moduleImports.push(...this._moduleDefinition.imports);
        }
        (moduleImports || []).forEach(item => {
            if (typeof item == "function") {
                return;
            }
            app.injector.addDefinition(inject_2.Util.getClassNameOrId(item.type), {
                injector: app.injector.parent,
                refName: item.id
            });
        });
    }
}
exports.ModuleLoader = ModuleLoader;
//# sourceMappingURL=moduleLoader.js.map