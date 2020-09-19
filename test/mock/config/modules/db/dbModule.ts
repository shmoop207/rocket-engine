import {IModuleOptions, module, Module} from '../../../../../index';
import {DbFactory} from "./src/dbFactory";
import {DbManager} from "./src/dbManager";
import {NestedProvider} from "../nested/src/nestedProvider";
import {IModuleParams} from "../../../../../lib/interfaces/IModule";
import {define, singleton,inject,initMethod,IFactory,factory,injectLazy}  from '@appolo/inject';


@module()
export class DbModule extends Module {


    @injectLazy() dbManager: DbManager

    public static for(options: { id: string }, moduleOptions: IModuleOptions = {}): IModuleParams {
        return {module: DbModule, options, moduleOptions}
    }

    public get exports() {

        return [{id: this.moduleOptions.id, type: DbFactory}, {
            id: this.moduleOptions.id + "DbManager",
            type: DbManager
        }]
    }

    public get imports() {
        return [{id: "env", type: 'env2'}]
    }

    public afterInitialize() {



    }

    public async onInjectInitialize() {
        this.dbManager.onInitCalled = true;
    }

    public afterLaunch() {

        let isFound = this.app.parent.discovery.findByType(NestedProvider);

        this.dbManager.isFoundExportedFile = !!isFound && !!this.dbManager.db;
    }
}

