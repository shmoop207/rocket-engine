import {IEnv} from "./interfaces/IEnv";
import {Define, Injector} from "@appolo/inject";
import {IOptions} from "./interfaces/IOptions";
import {Launcher} from "./launcher/launcher";
import {EventDispatcher,IEventOptions} from "@appolo/events";
import {ModuleManager} from "./modules/modules";
import {IClass, ModuleArg} from "./interfaces/IModule";
import {IApp} from "./interfaces/IApp";
import {Events} from "./interfaces/events";
import {PipelineManager} from "./pipelines/pipelineManager";
import {Discovery} from "./launcher/discovery";


export class App extends EventDispatcher implements IApp {

    protected _env: IEnv;
    protected _injector: Injector;
    protected _options: IOptions;
    protected _launcher: Launcher;
    protected _moduleManager: ModuleManager;
    protected _pipelineManager: PipelineManager;
    protected _parent: IApp;
    protected _children: IApp[] = [];
    private _root: IApp;
    private _discovery: Discovery;


    constructor(options?: IOptions) {
        super();

        this._launcher = new Launcher(this);

        this._discovery = new Discovery(this);

        this._options = this._launcher.loadOptions(options);

        this._env = this._launcher.loadEnvironments();

        this._injector = this._launcher.loadInject();

        this._injector.addObject("app", this);

        this._moduleManager = this._launcher.createModuleManager();
        this._pipelineManager = this._launcher.createPipelineManager();
    }

    public get discovery(): Discovery {
        return this._discovery;
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

    public async module(...modules: ModuleArg[]): Promise<void> {

        await this._moduleManager.load(modules);
    }

    public get parent(): IApp {
        return this._parent;
    }

    public get root(): IApp {

        if (this._root) {
            return this._root;
        }

        let parent = this.parent;

        while (parent.parent != null) {
            parent = parent.parent;
        }

        this._root = parent;

        return parent;
    }

    public get children(): IApp[] {
        return this._children;
    }

    public set parent(value: IApp) {
        this._parent = value;
        value.children.push(this);

    }


    public async reset() {
        this.fireEvent(Events.BeforeReset);
        this._children.forEach(app => app.reset());

        this._injector.reset();

        this._children.length = 0;

        this._parent = null;

        this._injector = null;

        await this._launcher.reset();

        this._discovery.reset()

        this.fireEvent(Events.Reset);
    }

    public on(event: Events | string, fn: (...args: any[]) => any, scope?: any, options?: IEventOptions): void {
        return super.on(event.toString(), fn, scope, options)
    }

    public once(event: Events | string, fn?: (...args: any[]) => any, scope?: any): Promise<any> | void {
        return super.once(event.toString(), fn, scope);
    }
}








