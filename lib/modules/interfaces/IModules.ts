import {Module} from "../module";
import {IModuleCrt, ModuleArg, ModuleFunction} from "./IModule";

export interface IModules {
    moduleAt<T extends Module>(index: number): T

    modulesByType<T extends Module>(type: IModuleCrt): T[]

    loadFn(...fn: ModuleFunction[]): Promise<void>

    use(...module: ModuleArg []): this

    load(...module: ModuleArg []): Promise<Module[]>
}
