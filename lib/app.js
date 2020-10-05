"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const launcher_1 = require("./launcher/launcher");
const events_1 = require("@appolo/events");
const discovery_1 = require("./discovery/discovery");
const events_2 = require("./events/events");
const modules_1 = require("./modules/modules");
const tree_1 = require("./tree/tree");
class App {
    constructor(options) {
        this._launcher = new launcher_1.Launcher(this);
        this._discovery = new discovery_1.Discovery(this);
        this._dispatcher = new events_1.EventDispatcher();
        this._options = this._launcher.loadOptions(options);
        this._env = this._launcher.loadEnvironments();
        this._injector = this._launcher.loadInject();
        this._tree = new tree_1.Tree(this);
        this._events = new events_2.Events(this);
        this._injector.addObject("app", this);
        let moduleManager = this._launcher.createModuleManager();
        let pipelineManager = this._launcher.createPipelineManager();
        this._modules = new modules_1.Modules(this, moduleManager);
        this._injector.addObject("modules", this._modules);
        this._injector.addObject("discovery", this._discovery);
        this._injector.addObject("dispatcher", this._dispatcher);
    }
    get modules() {
        return this._modules;
    }
    get events() {
        return this._events;
    }
    get tree() {
        return this._tree;
    }
    get discovery() {
        return this._discovery;
    }
    get dispatcher() {
        return this._dispatcher;
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
    async reset() {
        await this.events.beforeReset.fireEventAsync();
        this._tree.children.forEach(app => app.reset());
        await this._launcher.reset();
        this._discovery.reset();
        this._injector.reset();
        await this.events.reset.fireEventAsync();
        this._tree.parent = null;
        this._injector = null;
        this._tree.children.length = 0;
    }
}
exports.App = App;
//# sourceMappingURL=app.js.map