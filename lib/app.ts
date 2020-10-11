import {IEnv} from "./interfaces/IEnv";
import {Define, Injector} from "@appolo/inject";
import {IOptions} from "./interfaces/IOptions";
import {Launcher} from "./launcher/launcher";
import {Event, IEvent} from "@appolo/events";
import {IClass} from "./interfaces/IModule";
import {IApp} from "./interfaces/IApp";
import {EventDispatcher} from "@appolo/events";
import {Discovery} from "./discovery/discovery";

import {Events} from "./events/events";
import {Modules} from "./modules/modules";
import {Tree} from "./tree/tree";

export class App implements IApp {

    protected _env: IEnv;
    protected _injector: Injector;
    protected _options: IOptions;
    protected _launcher: Launcher;
    protected _events: Events;
    protected _modules: Modules;
    protected _tree :Tree;


    protected readonly _discovery: Discovery;
    protected readonly _dispatcher: EventDispatcher;

    constructor(options?: IOptions) {

        this._launcher = new Launcher(this);

        this._discovery = new Discovery(this);
        this._dispatcher = new EventDispatcher();

        this._options = this._launcher.loadOptions(options);

        this._env = this._launcher.loadEnvironments();

        this._injector = this._launcher.loadInject();

        this._tree = new Tree(this);

        this._events = new Events(this);

        this._injector.addObject("app", this);

        let moduleManager = this._launcher.createModuleManager();
        let pipelineManager = this._launcher.createPipelineManager();

        this._modules = new Modules(this, moduleManager);

        this._injector.addObject("modules", this._modules);
        this._injector.addObject("discovery", this._discovery);
        this._injector.addObject("dispatcher", this._dispatcher);

    }

    public get module(): Modules {
        return this._modules;
    }

    public get event(): Events {
        return this._events;
    }

    public get tree():Tree{
        return this._tree;
    }

    public get discovery(): Discovery {
        return this._discovery;
    }

    public get dispatcher(): EventDispatcher {
        return this._dispatcher
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


    public async reset() {
        await (this.event.beforeReset as Event<void>).fireEventAsync();
        this._tree.children.forEach(app => app.reset());

        await this._launcher.reset();

        this._discovery.reset();

        this._injector.reset();

        await (this.event.afterReset as Event<void>).fireEventAsync();

        this._tree.parent = null;

        this._injector = null;

        this._tree.children.length = 0;
    }

}








