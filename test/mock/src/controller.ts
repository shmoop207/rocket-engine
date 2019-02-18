"use strict";
import {before, define, EventDispatcher, inject,after} from '../../../index';
import {Manager} from "./manager";
import {Logger2} from "../config/modules/logger2";
import {BeforeTest} from "./beforeTest";

@define()
export class Controller extends EventDispatcher {
    working: boolean;
    @inject() manager: Manager;
    @inject() logger2: Logger2;

    constructor() {
        super();
    }

    run() {

        this.working = true;
    }

    @before<BeforeTest>(BeforeTest, c => c.run)
    async testBefore(num: number) {

        return num + 1
    }

    @after<BeforeTest>(BeforeTest, c => c.runAfter)
    async testAfter(num: number) {

        return num + 1
    }
}


