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
    constructor(protected _app: IApp) {
    }

    public readonly onModuleExport: IEvent<EventModuleExport> = new Event();
    public readonly beforeModuleInitialize: IEvent<EventBeforeModuleInit> = new Event();
    public readonly afterModuleInitialize: IEvent<EventModuleInit> = new Event();
    public readonly beforeModulesLoad: IEvent<void> = new Event();
    public readonly afterModulesLoaded: IEvent<void> = new Event();
    public readonly beforeInjectorInitialize: IEvent<void> = new Event();
    public readonly afterInjectorInitialize: IEvent<void> = new Event();
    public readonly beforeBootstrap: IEvent<void> = new Event();
    public readonly afterBootstrap: IEvent<void> = new Event();
    public readonly afterLaunch: IEvent<void> = new Event();

    public readonly beforeInjectRegister: IEvent<EventBeforeInjectRegister> = new Event();

    public readonly onClassExport: IEvent<EventClassExport> = new Event();
    public readonly afterInjectRegister: IEvent<EventInjectRegister> = new Event();
    public readonly beforeReset: IEvent<void> = new Event();
    public readonly afterReset: IEvent<void> = new Event();

    public get onOwnInstanceInitialized() {
        return this._app.injector.events.instanceOwnInitialized;
    }

    public get onInstanceInitialized() {
        return this._app.injector.events.instanceInitialized;
    }

    public get onOwnInstanceCreated() {
        return this._app.injector.events.instanceOwnCreated;
    }

    public get onInstanceCreated() {
        return this._app.injector.events.instanceCreated;
    }
}
