import {IEnv} from "./interfaces/IEnv";
import {Define, Injector} from "appolo-inject";
import {IOptions} from "./interfaces/IOptions";
import {Launcher} from "./launcher/launcher";
import {EventDispatcher} from "appolo-event-dispatcher";
import {ModuleFn, ModuleManager} from "./modules/modules";
import {IClass} from "./interfaces/IModuleDefinition";
import {IApp} from "./interfaces/IApp";
import * as Events from "events";
import {IEventOptions} from "appolo-event-dispatcher/lib/IEventOptions";
import _ = require("lodash");


export class App extends EventDispatcher implements IApp {

    protected _env: IEnv;
    protected _injector: Injector;
    protected _options: IOptions;
    protected _launcher: Launcher;
    protected _moduleManager: ModuleManager;
    protected _parent: App;
    protected _children: App[] = [];


    constructor(options?: IOptions) {
        super();

        this._launcher = new Launcher(this);

        this._options = this._launcher.loadOptions(options);

        this._env = this._launcher.loadEnvironments();

        this._injector = this._launcher.loadInject();

        this._injector.addObject("app", this);

        this._moduleManager = this._launcher.createModuleManager();
    }

    public static create(options: IOptions): App {
        return new App(options);
    };

    public get launcher(): Launcher {
        return this._launcher
    }

    public async launch(): Promise<App> {

        await this._launcher.launch();

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

    public register(id: string | IClass, type?: IClass): Define {
        return this._injector.register(id, type)
    }

    public async module(...modules: ModuleFn[]): Promise<void> {

        await this._moduleManager.load(modules);
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

    public get exportedClasses(): { fn: Function, path: string }[] {
        return this._launcher.exportedClasses
    }

    public reset() {
        _.forEach(this._children, app => app.reset());

        this._injector.reset();

        this._children.length = 0;

        this._parent = null;

        this._injector = null;

        this._launcher.reset();
    }

    public on(event: Events | string, fn: (...args: any[]) => any, scope?: any, options?: IEventOptions): void {
        return super.on(event.toString(), fn, scope, options)
    }

    public once(event: Events | string, fn?: (...args: any[]) => any, scope?: any): Promise<any> | void {
        return super.once(event.toString(), fn, scope);
    }
}








