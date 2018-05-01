"use strict";
import {bootstrap, define, IBootstrap, inject, singleton} from '../../../index';
import {Manager} from "./manager";
import {Delay} from "../config/modules/delay/src/delay";

@define()
@singleton()
@bootstrap()
export class Bootstrap implements IBootstrap {

    working: boolean;

    @inject() manager: Manager
    @inject() delay: Delay;
    @inject() dbMock: { conn: string,env:string,name:string };


    async run() {


        this.working = true;

    }
}
