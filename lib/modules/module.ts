import {Injector, createContainer} from "rocket-inject";

export class Module {

    private _injector: Injector;

    constructor() {
        this._injector = createContainer();
    }

    public async initialize() {

        await this._injector.initialize();
    }

    public async launch() {

    }

}