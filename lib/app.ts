import {IEnv} from "./interfaces/IEnv";
import {Define, Injector} from "appolo-inject";
import {IOptions} from "./interfaces/IOptions";
import {Launcher} from "./launcher/launcher";
import {ModuleFn, ModuleManager} from "./modules/modules";
import {Class} from "./interfaces/IModuleDefinition";
import Q = require("bluebird");


export class App {

    protected _env: IEnv;
    protected _injector: Injector;
    protected _options: IOptions;
    protected _launcher: Launcher;
    protected _moduleManager: ModuleManager;
    protected _parent: App;
    protected _children: App[] = [];


    constructor(options?: IOptions) {

        this._launcher = new Launcher();

        this._options = this._launcher.loadOptions(options);

        this._env = this._launcher.loadEnvironments();

        this._injector = this._launcher.loadInject();

        this._injector.addObject("app", this);

        this._moduleManager = this._launcher.createModuleManager();
    }

    public static create(options: IOptions): App {
        return new App(options);
    };


    public async launch(): Promise<App> {

        await this._launcher.launch();

        if(this.parent){
            return;
        }

        for (let app of this._children) {
            await app._launcher.initInjector()
        }

        await this._launcher.initInjector();


        for (let app of this._children) {
            await app._launcher.loadBootStrap()
        }

        await this._launcher.loadBootStrap();

        return this;
    }

    public get env(): IEnv {
        return this._env;
    }

    public get options(): IOptions {
        return this._options;
    }

    public get injector(): Injector {
        return this._injector;
    }

    public register(id: string | Class, type?: Class): Define {
        return this._injector.register(id, type)
    }

    public async module(...moduleFn: ModuleFn[]): Promise<void> {

        await Q.map(moduleFn, module => this._moduleManager.load(module));
    }

    public plugin(fn: (fn: Function) => void) {
        this._launcher.plugins.push(fn);
    }

    public reset() {
        this._injector.reset();
    }

    public get parent(): App {
        return this._parent;
    }

    public get children(): App[] {
        return this._children;
    }

    public set parent(value: App) {
        this._parent = value;
        value.children.push(this);

    }


}