"use strict";
import {bootstrap,  IBootstrap,} from '../../../index';
import {Manager} from "./manager";
import {Delay} from "../config/modules/delay/src/delay";
import {DbManager} from "../config/modules/db/src/dbManager";
import {define, singleton,inject,initMethod,IFactory,factory}  from '@appolo/inject';

@define()
@singleton()
@bootstrap()
export class Bootstrap implements IBootstrap {

    working: boolean;

    @inject() manager: Manager
    @inject() delay: Delay;
    @inject() delay2: Delay;
    @inject() dbMock: { conn: string,env:string,name:string,time:number };
    @inject() dbManagerNested: DbManager;


    async run() {


        this.working = true;

    }
}
