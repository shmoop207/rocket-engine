"use strict";
import {define, singleton, inject, IBootstrap,bootstrap} from '../../../index';
import {Manager} from "./manager";

@define()
@singleton()
@bootstrap()
export class Bootstrap   implements IBootstrap{

    working:boolean;

    @inject() manager:Manager


    async run() {


        this.working = true;

    }
}
