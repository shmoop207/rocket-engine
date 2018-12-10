import {Events, IModuleOptions, Module, module} from '../../../../../index';
import {Delay} from "./src/delay";
import {Bootstrap} from "../../../src/bootstrap";

interface IOptions extends IModuleOptions {
    delay: number,
    testModule: string,
    id?: string
}


@module()
export class DelayModule extends Module<IOptions> {

    public get exports() {
        return [{id: this.moduleOptions.id || "delay", type: Delay}];

    }

    protected beforeLaunch() {
        this._app.on(Events.ClassExport, (fn: Function, path: string) => {
            if (fn === Bootstrap && !this._app.parent.injector.getInstance("exportedClassEvent")) {

                this._app.parent.injector.addInstance("exportedClassEvent", true)

            }
        })
    }

}

