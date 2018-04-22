"use strict";
import {define, singleton, inject, EventDispatcher} from '../../../index';
import {Manager} from "./manager";
import {Logger2} from "../config/modules/logger2";

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
}


