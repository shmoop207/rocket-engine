import {Injector} from "appolo-inject";
import {createApp, IApp} from "../../index"
import {Util} from "../util/util";
import {IClass, IModuleDefinition, IModuleOptions, ModuleTypes} from "../interfaces/IModuleDefinition";
import {App} from "../app";
import {IEnv} from "../interfaces/IEnv";
import {AppModuleOptionsSymbol, ModuleSymbol} from "../decoretors/module";
import {Events} from "../interfaces/events";
import {InjectDefineSymbol} from "appolo-inject/index";
import   _ = require('lodash');


export class Module<T extends IModuleOptions = any> {

    protected _exports: ModuleTypes;
    protected _imports: ModuleTypes;
    protected _moduleOptions: T;
    protected _app: App;
    protected _moduleDefinition: IModuleDefinition;
    protected _parallel: boolean;
    protected _immediate: boolean;


    protected readonly Defaults: Partial<T> = {};

    protected get defaults(): Partial<T> {
        return this.Defaults
    }

    constructor(options: T = {} as T) {
        this._moduleDefinition = Reflect.getMetadata(ModuleSymbol, this.constructor);

        this._moduleOptions = _.defaults({}, options, {
            immediate: this._moduleDefinition.immediate,
            parallel: this._moduleDefinition.parallel
        }, {immediate: false, parallel: false});
    }

    public get app(): IApp {
        return this._app;
    }

    public get parent(): IApp {
        return this._app.parent;
    }

    public get rootParent(): IApp {

        let parent = this.app.parent;

        while (parent.parent != null) {
            parent = parent.parent;
        }

        return parent;
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

    protected beforeInitialize() {

    }

    protected beforeLaunch() {

    }

    protected afterInitialize() {

    }


    public async initialize(parent: Injector): Promise<void> {

        try {

            if (!this._moduleDefinition) {
                return;
            }


            this._setDefinitions();

            this._app = this._createApp(parent, this._moduleDefinition);

            this._moduleOptions = _.defaultsDeep({}, this._moduleOptions || {}, this.defaults);

            this._app.injector.addObject("moduleOptions", this._moduleOptions, true);

            this.beforeInitialize();

            await this._loadInnerModules(this._app, this._moduleDefinition);

            this._handleExports(this._app);

            this._handleImports(this._app);

            this.beforeLaunch();

            this._fireClassExportEvents();

            await this._app.launch();

            this.afterInitialize();


        } catch (e) {
            Util.logger(parent).error(`failed to initialize module ${this.constructor.name}`, {e: e.stack})

            throw e;
        }
    }


    private _fireClassExportEvents() {
        if (!this._app.hasListener(Events.ClassExport) && !this._app.hasListener(Events.InjectRegister)) {
            return;
        }

        _.forEach(this._app.parent.exported, item => {

            if (Reflect.hasMetadata(InjectDefineSymbol, item.fn)) {

                this._app.fireEvent(Events.InjectRegister, item.fn, item.path);
            }

            this._app.fireEvent(Events.ClassExport, item.fn, item.path);
        })
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
            environment: rootEnv.type
        });

        app.injector.addObject("rootEnv", rootEnv, true);
        app.injector.addObject("env", _.extend({}, rootEnv, app.env), true);


        Reflect.defineMetadata(AppModuleOptionsSymbol, this._moduleOptions, app);

        app.injector.parent = parent;

        app.parent = parent.get<App>('app');

        return app;
    }

    private async _loadInnerModules(app: App, moduleDefinition: IModuleDefinition) {

        if (!moduleDefinition.modules) {
            return;
        }

        for (let module of moduleDefinition.modules) {
            let moduleInstance = module instanceof Module ? module : new (module as typeof Module);
            await moduleInstance.initialize(app.injector);
        }
    }

    private _handleExports(app: App) {
        _.forEach(this.exports, item => {


            let id, type;

            if (typeof item == "function") {
                id = Util.getClassNameOrId(item as IClass);
                type = item;
                app.injector.parent.addDefinition(id, {injector: app.injector})
            } else {
                id = item.id;
                type = item.type;
                app.injector.parent.addDefinition(item.id, {
                    injector: app.injector,
                    refName: Util.getClassNameOrId(item.type)
                })
            }
            this._app.fireEvent(Events.ModuleExport, type, id);
            this._app.parent && (this._app.parent.fireEvent(Events.ModuleExport, type, id));
        });
    }

    private _handleImports(app: App) {
        _.forEach(this.imports, item => {

            if (typeof item == "function") {
                return;
            }

            app.injector.addDefinition(Util.getClassNameOrId(item.type), {
                injector: app.injector.parent,
                refName: item.id
            })
        });
    }
}