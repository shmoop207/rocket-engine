import {IModuleOptions, Module, module} from '../../../../../index';
import {Delay} from "./src/delay";
import {Promises} from "@appolo/utils";
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
        return {type: DelayModule, config:options, ...moduleOptions}
    }

    public get exports() {
        return [{id: this.moduleOptions.id || "delay", type: Delay}];

    }

    public beforeModuleLaunch() {
        let isExists = !!this._app.tree.parent.discovery.findByType(Bootstrap)

        this.app.tree.parent.events.afterInjectRegister.on(payload => {
            if (payload.type ==  Bootstrap && isExists && !this._app.tree.parent.injector.getInstance("exportedClassEvent")) {

                this._app.tree.parent.injector.addInstance("exportedClassEvent", true)

            }
        })

        this.app.events.beforeReset.on(async ()=>{
           await Promises.delay(1);
            this.app.tree.parent["resetTestEvent"] = true;
        },this,{await:true})

    }

    public  beforeReset() {
        this.app.tree.parent["resetTest"] = true;
    }

}

