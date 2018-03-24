import {Module} from "./module";
import {Injector, createContainer} from "rocket-inject";

export class AppModule extends Module {

    constructor(injector: Injector,private modules:Module[]) {
        super();

        this._injector = injector;
    }

    public get imports():Module[]{
        return [];
    }
}