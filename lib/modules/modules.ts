import {IApp} from "../app/IApp";
import {ModulesManager} from "./modulesManager";
import {Module} from "./module";
import {IModuleCrt, IModuleOptions, ModuleArg, ModuleFunction} from "./interfaces/IModule";
import {Promises} from "@appolo/utils/index";
import {IModules} from "./interfaces/IModules";

export class Modules implements IModules {
    constructor(private _app: IApp, private _modulesManager: ModulesManager) {
    }

    public moduleAt<T extends Module>(index: number): T {
        let moduleLoader = this._modulesManager.modules[index];

        return moduleLoader ? moduleLoader.module as T : null
    }

    public modulesByType<T extends Module>(type: IModuleCrt): T[] {
        let modules = this._modulesManager.modules.filter(loader => loader.module.constructor.name === type.name).map(loader => loader.module)

        return modules as T[]
    }

    public async loadFn(...fn: ModuleFunction[]): Promise<void> {

        await Promises.map(fn, item => this._modulesManager.loadStaticModule(item));
    }

    public use(...module: ModuleArg []): this {

        this._modulesManager.register(module);

        return this;
    }

    public async load(...module: ModuleArg []): Promise<Module[]> {

        let modules = await this._modulesManager.load(module);

        return modules;
    }
}

