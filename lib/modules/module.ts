import {Injector} from "appolo-inject";
import {createApp} from "../../index"
import {ModuleSymbol} from "../decorators";
import {Util} from "../util/util";
import {IModuleDefinition} from "../interfaces/IModuleDefinition";
import {App} from "../app";
import   _ = require('lodash');

export class Module {

    protected _exports: any[] = [];
    protected _options: any;
    protected _app: App;
    protected _moduleDefinition: IModuleDefinition;

    constructor(options?: any) {
        this._options = options || {};
    }

    public get exports(): any[] {
        return this._exports;
    }

    public async initialize(parent: Injector, plugins: ((fn: Function) => void)[]) {

        this._moduleDefinition = Reflect.getMetadata(ModuleSymbol, this.constructor);

        if (!this._moduleDefinition) {
            return;
        }

        if (this._moduleDefinition.options) {
            _.extend(this._options, this._moduleDefinition.options)
        }

        if (this._moduleDefinition.exports) {
            this._exports = this._moduleDefinition.exports;
        }

        this._app = this._createApp(parent, this._moduleDefinition);

        _.forEach(plugins, plugin => this._app.plugin(plugin));

        await this._loadImports(this._app, this._moduleDefinition,plugins);

        this._handleExports(this._app);

        await this._app.launch();
    }

    private _createApp(parent: Injector, moduleDefinition: IModuleDefinition): App {
        let app = createApp({root: moduleDefinition.root});


        app.injector.addObject("env", parent.getObject("env"), true);
        app.injector.addObject("moduleOptions", this._options, true);

        app.injector.parent = parent;

        return app;
    }

    private async _loadImports(app: App, moduleDefinition: IModuleDefinition,plugins: ((fn: Function) => void)[]) {

        if (!moduleDefinition.imports) {
            return;
        }
        for (let module of moduleDefinition.imports) {
            let moduleInstance = module instanceof Module ? module : new (module as typeof Module);
            await moduleInstance.initialize(app.injector,plugins);
        }
    }

    private _handleExports(app: App) {
        _.forEach(this.exports, item => {
            let id = Util.getClassNameOrId(item);
            app.injector.parent.addDefinition(id, {injector: app.injector})
        });
    }


}