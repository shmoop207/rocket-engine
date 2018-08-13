import {Injector} from "appolo-inject";
import {createApp} from "../../index"
import {Util} from "../util/util";
import {IClass, IModuleDefinition, IPlugin, ModuleTypes} from "../interfaces/IModuleDefinition";
import {App} from "../app";
import {IEnv} from "../interfaces/IEnv";
import   _ = require('lodash');
import {ModuleSymbol} from "../decoretors/module";


export class Module<T = any> {

    protected _exports: ModuleTypes;
    protected _imports: ModuleTypes;
    protected _moduleOptions: any;
    protected _app: App;
    protected _moduleDefinition: IModuleDefinition;

    protected readonly Defaults: Partial<T> = {};

    protected get defaults(): Partial<T> {
        return this.Defaults
    }

    constructor(options?: T) {
        this._moduleOptions = options || {};
    }

    public get exports(): ModuleTypes {
        return this._exports;
    }

    public get imports(): ModuleTypes {
        return this._imports;
    }

    public get moduleOptions(): T {
        return this._moduleOptions;
    }

    public async initialize(parent: Injector, plugins: IPlugin[]) {

        try {
            this._moduleDefinition = Reflect.getMetadata(ModuleSymbol, this.constructor);

            if (!this._moduleDefinition) {
                return;
            }

            this._setDefinitions();

            this._app = this._createApp(parent, this._moduleDefinition);

            this._moduleOptions = _.defaultsDeep({}, this._moduleOptions || {}, this.defaults);

            this._app.injector.addObject("moduleOptions", this._moduleOptions, true);

            await this._loadInnerModules(this._app, this._moduleDefinition, plugins);

            this._handleExports(this._app);
            this._handleImports(this._app);

            this._handlePlugins(this._exports, plugins);


            await this._app.launch();
        } catch (e) {
            Util.logger(parent).error(`failed to initialize module ${this.constructor.name}`, {e: e.stack})

            throw e;
        }
    }

    private _setDefinitions() {
        if (this._moduleDefinition.options) {
            _.extend(this._moduleOptions, this._moduleDefinition.options)
        }

        if (this._moduleDefinition.exports) {
            this._exports = this._moduleDefinition.exports;
        }

        if (this._moduleDefinition.imports) {
            this._imports = this._moduleDefinition.imports;
        }
    }

    private _createApp(parent: Injector, moduleDefinition: IModuleDefinition): App {


        let rootEnv = parent.getObject<IEnv>("env");

        let app = createApp({
            root: moduleDefinition.root,
            immediate: moduleDefinition.immediate,
            environment: rootEnv.type
        });


        app.injector.addObject("rootEnv", rootEnv, true);
        app.injector.addObject("env", _.extend({}, rootEnv, app.env), true);


        app.injector.parent = parent;

        app.parent = parent.get<App>('app');


        return app;
    }

    private async _loadInnerModules(app: App, moduleDefinition: IModuleDefinition, plugins: IPlugin[]) {

        if (!moduleDefinition.modules) {
            return;
        }

        for (let module of moduleDefinition.modules) {
            let moduleInstance = module instanceof Module ? module : new (module as typeof Module);
            await moduleInstance.initialize(app.injector, plugins);
        }
    }

    private _handleExports(app: App) {
        _.forEach(this.exports, item => {

            if (typeof item == "function") {
                app.injector.parent.addDefinition(Util.getClassNameOrId(item as IClass), {injector: app.injector})
            } else {

                app.injector.parent.addDefinition(item.id, {
                    injector: app.injector,
                    refName: Util.getClassNameOrId(item.type)
                })
            }


        });
    }

    private _handleImports(app: App) {
        _.forEach(this.imports, item => {

            if (typeof item == "function") {
                //app.injector.addDefinition(Util.getClassNameOrId(item as Class), {injector: app.injector})
            } else {

                app.injector.addDefinition(Util.getClassNameOrId(item.type), {
                    injector: app.injector.parent,
                    refName: item.id
                })
            }


        });
    }

    private _handlePlugins(exports: any[], plugins: IPlugin[]) {
        _.forEach(exports, item =>
            _.isFunction(item) && _.forEach(plugins, plugin => plugin(item)));
    }


}