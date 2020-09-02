import {Events, IModuleOptions, Module, module} from '../../../../../index';
import {Delay} from "./src/delay";
import {Bootstrap} from "../../../src/bootstrap";
import {IModuleParams} from "../../../../../lib/interfaces/IModule";

interface IOptions {
    delay: number,
    testModule: string,
    id?: string
}


@module({exports: []})
export class DelayModule extends Module<IOptions> {

    public static for(options: IOptions, moduleOptions: IModuleOptions = {}): IModuleParams {
        return {module: DelayModule, options, moduleOptions}
    }

    public get exports() {
        return [{id: this.moduleOptions.id || "delay", type: Delay}];

    }

    public beforeLaunch() {
        this._app.on(Events.ClassExport, (fn: Function, path: string) => {
            if (fn === Bootstrap && !this._app.parent.injector.getInstance("exportedClassEvent")) {

                this._app.parent.injector.addInstance("exportedClassEvent", true)

            }
        })
    }

}

