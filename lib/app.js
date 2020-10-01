"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const launcher_1 = require("./launcher/launcher");
const events_1 = require("@appolo/events");
const discovery_1 = require("./discovery/discovery");
class App {
    constructor(options) {
        this._children = [];
        this.eventModuleExport = new events_1.Event();
        this.eventBeforeModuleInit = new events_1.Event();
        this.eventModuleInit = new events_1.Event();
        this.eventBeforeModulesLoad = new events_1.Event();
        this.eventModulesLoaded = new events_1.Event();
        this.eventBeforeInjectorInit = new events_1.Event();
        this.eventInjectorInit = new events_1.Event();
        this.eventBeforeBootstrap = new events_1.Event();
        this.eventBootstrap = new events_1.Event();
        this.eventsBeforeInjectRegister = new events_1.Event();
        this.eventsEventClassExport = new events_1.Event();
        this.eventsInjectRegister = new events_1.Event();
        this.eventsBeforeReset = new events_1.Event();
        this.eventsReset = new events_1.Event();
        this._launcher = new launcher_1.Launcher(this);
        this._discovery = new discovery_1.Discovery(this);
        this._options = this._launcher.loadOptions(options);
        this._env = this._launcher.loadEnvironments();
        this._injector = this._launcher.loadInject();
        this._injector.addObject("app", this);
        this._moduleManager = this._launcher.createModuleManager();
        this._pipelineManager = this._launcher.createPipelineManager();
    }
    get discovery() {
        return this._discovery;
    }
    static create(options) {
        return new App(options);
    }
    ;
    get launcher() {
        return this._launcher;
    }
    async launch() {
        await this._launcher.launch();
        return this;
    }
    get env() {
        return this._env;
    }
    get options() {
        return this._options;
    }
    get injector() {
        return this._injector;
    }
    register(id, type) {
        return this._injector.register(id, type);
    }
    async module(...modules) {
        await this._moduleManager.load(modules);
    }
    getParent() {
        return this.parent;
    }
    get parent() {
        return this._parent;
    }
    getRoot() {
        return this.root;
    }
    get root() {
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
    get children() {
        return this._children;
    }
    set parent(value) {
        this._parent = value;
        value.children.push(this);
    }
    get eventInstanceOwnInitialized() {
        return this._injector.instanceOwnInitializedEvent;
    }
    get eventInstanceInitialized() {
        return this._injector.instanceInitializedEvent;
    }
    get eventInstanceOwnCreated() {
        return this._injector.instanceOwnCreatedEvent;
    }
    get eventInstanceCreated() {
        return this._injector.instanceCreatedEvent;
    }
    async reset() {
        await this.eventsBeforeReset.fireEventAsync();
        this._children.forEach(app => app.reset());
        await this._launcher.reset();
        this._discovery.reset();
        this._injector.reset();
        await this.eventsReset.fireEventAsync();
        this._parent = null;
        this._injector = null;
        this._children.length = 0;
    }
}
exports.App = App;
//# sourceMappingURL=app.js.map