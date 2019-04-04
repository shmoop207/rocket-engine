import {Events, IModuleOptions, Module, module} from '../../../../../index';
import {Bootstrap} from "../../../src/bootstrap";
import {NestedProvider} from "./src/nestedProvider";
import {DbManager} from "../db/src/dbManager";

interface IOptions extends IModuleOptions {
    delay: number,
    testModule: string,
    id?: string
}


@module()
export class NestedModule extends Module<IOptions> {

    public get exports() {
        return [{id: this.moduleOptions.id || "nestedProvider", type: NestedProvider},{id:"dbManagerNested",type:"dbMock2DbManager"}];

    }



}

