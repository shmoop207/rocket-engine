import {module, Module} from '../../../../../index';
import {DbFactory} from "./src/dbFactory";
import {DbManager} from "./src/dbManager";


@module()
export class DbModule extends Module {

    constructor(opts: { id: string }) {
        super(opts);
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
}

