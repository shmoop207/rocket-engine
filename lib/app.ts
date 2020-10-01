import {IEnv} from "./interfaces/IEnv";
import {Define, Injector} from "@appolo/inject";
import {IOptions} from "./interfaces/IOptions";
import {Launcher} from "./launcher/launcher";
import {Event, IEvent} from "@appolo/events";
import {ModuleManager} from "./modules/modules";
import {IClass, ModuleArg} from "./interfaces/IModule";
import {IApp} from "./interfaces/IApp";
import {PipelineManager} from "./pipelines/pipelineManager";
import {Discovery} from "./discovery/discovery";
import {Module} from "./modules/module";
import {
    EventBeforeInjectRegister,
    EventBeforeModuleInit, EventClassExport, EventInjectRegister,
    EventModuleExport,
    EventModuleInit
} from "./interfaces/events";

export class App implements IApp {

    protected _env: IEnv;
    protected _injector: Injector;
    protected _options: IOptions;
    protected _launcher: Launcher;
    protected _moduleManager: ModuleManager;
    protected _pipelineManager: PipelineManager;
    protected _parent: IApp;
    protected _children: IApp[] = [];
    private _root: IApp;
    protected readonly _discovery: Discovery;




    constructor(options?: IOptions) {

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

    public getParent<T extends IApp = IApp>(): T {
        return this.parent as T;
    }

    public get parent(): IApp {
        return this._parent;
    }

    public getRoot<T extends IApp = IApp>(): T {
        return this.root as T;
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

    public readonly eventModuleExport: IEvent<EventModuleExport> = new Event();
    public readonly eventBeforeModuleInit: IEvent<EventBeforeModuleInit> = new Event();
    public readonly eventModuleInit: IEvent<EventModuleInit> = new Event();
    public readonly eventBeforeModulesLoad: IEvent<void> = new Event();
    public readonly eventModulesLoaded: IEvent<void> = new Event();
    public readonly eventBeforeInjectorInit: IEvent<void> = new Event();
    public readonly eventInjectorInit: IEvent<void> = new Event();
    public readonly eventBeforeBootstrap: IEvent<void> = new Event();
    public readonly eventBootstrap: IEvent<void> = new Event();
    public readonly eventsBeforeInjectRegister: IEvent<EventBeforeInjectRegister> = new Event();
    public readonly eventsEventClassExport: IEvent<EventClassExport> = new Event();
    public readonly eventsInjectRegister: IEvent<EventInjectRegister> = new Event();
    public readonly eventsBeforeReset: IEvent<void> = new Event();
    public readonly eventsReset: IEvent<void> = new Event();

    public get eventInstanceOwnInitialized(){
        return this._injector.instanceOwnInitializedEvent;
    }

    public get eventInstanceInitialized(){
        return this._injector.instanceInitializedEvent;
    }

    public get eventInstanceOwnCreated(){
        return this._injector.instanceOwnCreatedEvent;
    }

    public get eventInstanceCreated(){
        return this._injector.instanceCreatedEvent;
    }

    public async reset() {
        await (this.eventsBeforeReset as Event<void>).fireEventAsync();
        this._children.forEach(app => app.reset());

        await this._launcher.reset();

        this._discovery.reset();

        this._injector.reset();

        await (this.eventsReset as Event<void>).fireEventAsync();

        this._parent = null;

        this._injector = null;

        this._children.length = 0;
    }

}








