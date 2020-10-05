import {Event, IEvent} from "@appolo/events";
import {Injector} from "@appolo/inject";
import {
    EventBeforeInjectRegister,
    EventBeforeModuleInit, EventClassExport, EventInjectRegister,
    EventModuleExport,
    EventModuleInit
} from "../interfaces/events";
import {IApp} from "../interfaces/IApp";

export class Events {
    constructor(private _app:IApp) {
    }
    public readonly moduleExport: IEvent<EventModuleExport> = new Event();
    public readonly beforeModuleInit: IEvent<EventBeforeModuleInit> = new Event();
    public readonly moduleInit: IEvent<EventModuleInit> = new Event();
    public readonly beforeModulesLoad: IEvent<void> = new Event();
    public readonly modulesLoaded: IEvent<void> = new Event();
    public readonly beforeInjectorInit: IEvent<void> = new Event();
    public readonly injectorInit: IEvent<void> = new Event();
    public readonly beforeBootstrap: IEvent<void> = new Event();
    public readonly bootstrap: IEvent<void> = new Event();
    public readonly beforeInjectRegister: IEvent<EventBeforeInjectRegister> = new Event();
    public readonly classExport: IEvent<EventClassExport> = new Event();
    public readonly injectRegister: IEvent<EventInjectRegister> = new Event();
    public readonly beforeReset: IEvent<void> = new Event();
    public readonly reset: IEvent<void> = new Event();

    public get instanceOwnInitialized() {
        return this._app.injector.events.instanceOwnInitialized;
    }

    public get instanceInitialized() {
        return this._app.injector.events.instanceInitialized;
    }

    public get instanceOwnCreated() {
        return this._app.injector.events.instanceOwnCreated;
    }

    public get instanceCreated() {
        return this._app.injector.events.instanceCreated;
    }
}
