import {IEnv} from "./IEnv";
import {Injector, createContainer} from "rocket-inject";
import {IOptions} from "./IOptions";
import {Launcher} from "./launcher/launcher";
import {ModuleFn, ModuleManager} from "./modules/modules";
import {Module} from "./modules/module";

export class App {

    protected _env: IEnv;
    protected _injector: Injector;
    protected _options: IOptions;
    protected _launcher: Launcher;
    protected _moduleManager: ModuleManager;

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

    public module(moduleFn: ModuleFn | typeof Module | Module): Promise<any> {

        return this._moduleManager.load(moduleFn) as Promise<any>;
    }

}