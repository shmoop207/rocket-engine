import {Module} from "./module";
import {App} from "../app/app";
import {Injector, InjectDefineSymbol} from "@appolo/inject";
import {IEnv} from "../interfaces/IEnv";
import {createApp, IApp, IClass} from "../../index";
import {AppModuleOptionsSymbol, ModuleSymbol} from "./decoreators/moduleDecorators";
import {Promises, Arrays, Objects} from '@appolo/utils';
import {IModuleDefinition, IModuleOptions, IModuleParams} from "./interfaces/IModule";
import {Util as InjectUtil} from "@appolo/inject";
import {Event} from "@appolo/events";
import {Util} from "../util/util";
import {EventModuleExport} from "../events/IEvents";

export class ModuleLoader {

    protected _moduleDefinition: IModuleDefinition = {};
    protected _moduleOptions: IModuleOptions = {}
    protected _module: Module;


    constructor(protected _moduleParams: IModuleParams, protected _parenInjector: Injector, moduleOptions:IModuleOptions) {

        this._moduleDefinition = Reflect.getMetadata(ModuleSymbol, _moduleParams.type) || {};

        if (!this._moduleDefinition) {
            throw new Error(`failed to find moduleDefinition for ${_moduleParams.type}`)
        }


        this._moduleOptions = Objects.defaults({}, moduleOptions, {
        }, {immediate: false, parallel: false});
    }

    public get module(): Module {
        return this._module
    }

    public get moduleOptions(): IModuleOptions {
        return this.module.moduleOptions
    }

    public preInitialize() {
        if (!this._moduleDefinition) {
            return;
        }

        let app = this._createApp(this._parenInjector, this._moduleDefinition);

        this._module = app.injector.get(this._moduleParams.type)

        this._setDefinitions();

        this._module.app = app

        this._module.moduleOptions = Objects.defaults({}, this._moduleParams.options || {}, this._module.defaults);

        this._module.app.injector.addObject("moduleOptions", this._module.moduleOptions, true);
        this._module.app.injector.addObject("discovery", app.discovery, true);

        this._handleFileExport();

    }


    public async initialize(): Promise<void> {

        try {

            await this._module.beforeModuleInitialize();

            this._handleExports(this._module.app);

            this._handleImports(this._module.app);

            await this._module.beforeModuleLaunch();

            await this._module.app.launch();

            //await this._module.afterModuleInitialize();


        } catch (e) {
            Util.logger(this._parenInjector).error(`failed to initialize module ${this._module.constructor.name}`, {e: e.stack});

            throw e;
        }
    }



    private _setDefinitions() {
        if (this._moduleDefinition.options) {
            Object.assign(this._module.moduleOptions, this._moduleDefinition.options)
        }
    }

    private _createApp(parent: Injector, moduleDefinition: IModuleDefinition): App {


        let rootEnv = parent.getObject<IEnv>("env");

        let app = createApp({
            root: moduleDefinition.root,
            environment: rootEnv.type
        });

        app.injector.addObject("rootEnv", rootEnv, true);
        app.injector.addObject("env", Object.assign({}, rootEnv, app.env), true);

        Reflect.defineMetadata(AppModuleOptionsSymbol, this._moduleOptions, app);

        app.injector.parent = parent;

        app.tree.parent = parent.get<App>('app');

        app.register(this._moduleParams.type);

        app.tree.root.event.beforeModulesLoad.on(()=>this._module.beforeAppInitialize(),this,{await:true})

        app.event.afterInjectorInitialize.on(()=>this._module.afterModuleInitialize(),this,{await:true});
        app.event.afterBootstrap.on(()=>this._module.afterModuleLaunch(),this,{await:true})

        app.tree.root.event.afterInjectorInitialize.on(()=>this._module.afterAppInitialize(),this,{await:true});
        app.tree.root.event.afterBootstrap.on(()=>this._module.afterAppLaunch(),this,{await:true})


        return app;
    }

    private _handleExports(app: IApp) {

        let moduleExports = [].concat(this._module.exports);

        if (this._moduleDefinition.exports && this._moduleDefinition.exports.length) {
            moduleExports.push(...this._moduleDefinition.exports)
        }

        moduleExports.forEach(item => {


            let id, type;

            if (typeof item == "function") {
                id = InjectUtil.getClassNameOrId(item as IClass);
                type = item;
                app.injector.parent.addDefinition(id, {injector: app.injector})
            } else {
                id = item.id;
                type = item.type;
                app.injector.parent.addDefinition(item.id, {
                    injector: app.injector,
                    refName: InjectUtil.getClassNameOrId(item.type)
                })
            }

            let eventDto = {
                type,
                id,
                module: this._module,
                injector: app.injector
            };

            (this._module.app.event.onModuleExport as Event<EventModuleExport>).fireEvent(eventDto);
            (this._module.app.tree.parent.event.onModuleExport as Event<EventModuleExport>).fireEvent(eventDto);

        });


    }

    private _handleFileExport() {
        this._module.fileExports.forEach(fn => {
            (this._module.app.tree.parent as App).discovery.add({path: "", fn, define: InjectUtil.getClassDefinition(fn)})
        })
    }

    private _handleImports(app: IApp) {

        let moduleImports = [].concat(this._module.imports);

        if (this._moduleDefinition.imports && this._moduleDefinition.imports.length) {
            moduleImports.push(...this._moduleDefinition.imports)
        }

        (moduleImports || []).forEach(item => {

            if (typeof item == "function") {
                return;
            }

            app.injector.addDefinition(InjectUtil.getClassNameOrId(item.type), {
                injector: app.injector.parent,
                refName: item.id
            })
        });
    }

    public async reset(){
         await this.module.reset();
    }

    public async beforeReset(){
         await this.module.beforeReset();
    }
}
