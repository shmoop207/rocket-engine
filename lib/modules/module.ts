import {Injector} from "appolo-inject";
import {createApp} from "../../index"
import {ModuleSymbol} from "../decorators";
import {Util} from "../util/util";
import {Class, IModuleDefinition} from "../interfaces/IModuleDefinition";
import {App} from "../app";
import   _ = require('lodash');


export class Module {

    protected _exports: (Class | { id: string, type: Class })[] = [];
    protected _moduleOptions: any;
    protected _app: App;
    protected _moduleDefinition: IModuleDefinition;

    constructor(options?: any) {
        this._moduleOptions = options || {};
    }

    public get exports(): (Class | { id: string, type: Class })[] {
        return this._exports;
    }

    public get moduleOptions(): any {
        return this._moduleOptions;
    }

    public async initialize(parent: Injector, plugins: ((fn: Function) => void)[]) {

        this._moduleDefinition = Reflect.getMetadata(ModuleSymbol, this.constructor);

        if (!this._moduleDefinition) {
            return;
        }

        if (this._moduleDefinition.options) {
            _.extend(this._moduleOptions, this._moduleDefinition.options)
        }

        if (this._moduleDefinition.exports) {
            this._exports = this._moduleDefinition.exports;
        }

        this._app = this._createApp(parent, this._moduleDefinition);

        await this._loadImports(this._app, this._moduleDefinition, plugins);

        this._handleExports(this._app);

        this._handlePlugins(this._exports, plugins);

        await this._app.launch();
    }

    private _createApp(parent: Injector, moduleDefinition: IModuleDefinition): App {
        let app = createApp({root: moduleDefinition.root});


        app.injector.addObject("env", parent.getObject("env"), true);
        app.injector.addObject("moduleOptions", this._moduleOptions, true);

        app.injector.parent = parent;

        return app;
    }

    private async _loadImports(app: App, moduleDefinition: IModuleDefinition, plugins: ((fn: Function) => void)[]) {

        if (!moduleDefinition.imports) {
            return;
        }
        for (let module of moduleDefinition.imports) {
            let moduleInstance = module instanceof Module ? module : new (module as typeof Module);
            await moduleInstance.initialize(app.injector, plugins);
        }
    }

    private _handleExports(app: App) {
        _.forEach(this.exports, item => {

            if (typeof item == "function") {
                app.injector.parent.addDefinition(Util.getClassNameOrId(item as Class), {injector: app.injector})
            } else {

                app.injector.parent.addDefinition(item.id, {
                    injector: app.injector,
                    refName: Util.getClassNameOrId(item.type)
                })
            }


        });
    }

    private _handlePlugins(exports: any[], plugins: ((fn: Function) => void)[]) {
        _.forEach(exports, item =>
            _.isFunction(item) && _.forEach(plugins, plugin => plugin(item)));
    }


}