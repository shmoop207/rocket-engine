import { module, Module} from '../../../../../index';
import {DbFactory} from "./src/dbFactory";
import {DbManager} from "./src/dbManager";
import {NestedProvider} from "../nested/src/nestedProvider";
import {IModuleParams} from "../../../../../lib/modules/interfaces/IModule";
import {define, singleton,inject,init,IFactory,factory,lazy}  from '@appolo/inject';


@module()
export class DbModule extends Module {


    @lazy() dbManager: DbManager

    public static for(options: { id: string }) {
        return super.for(options)
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

    public afterAppInitialize() {



    }

    public async onInjectInitialize() {
        this.dbManager.onInitCalled = true;
    }

    public async afterAppLaunch() {

        let isFound = this.app.tree.parent.discovery.findByType(NestedProvider);

        this.dbManager.isFoundExportedFile = !!isFound && !!this.dbManager.db;
    }
}

