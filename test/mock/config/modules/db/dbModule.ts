import {module, Module} from '../../../../../index';
import {DbFactory} from "./src/dbFactory";


@module()
export class DbModule extends Module {

    constructor(opts: { id: string }) {
        super(opts);
    }

    public get exports() {

        return [{id: this.moduleOptions.id, type: DbFactory}]
    }

    public get imports(){
        return [{id: "env", type: 'env2'}]
    }
}

