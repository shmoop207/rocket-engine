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
        this._options = Launcher.loadOptions(options);

        this._moduleManager = new ModuleManager(this);

        this._env = Launcher.loadEnvironments(this._options);

        this._injector = createContainer();

        this._loadInject()

    }

    public static create(options: IOptions): App {
        return new App(options);
    };


    protected _loadInject() {
        this._injector.addObject("environment", this._env);
        this._injector.addObject("env", this._env);
        this._injector.addObject("inject", this._injector);
        this._injector.addObject("injector", this._injector);
        this._injector.addObject("app", this);
    }

    public async launch(): Promise<App> {

        this._launcher = new Launcher(this);

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

        return this._moduleManager.load(moduleFn, this.injector) as Promise<any>;
    }

}