"use strict";
import {define, singleton, inject, EventDispatcher} from '../../../index';
@define()
@singleton()
export class Manager extends EventDispatcher {

    working:boolean
    constructor() {
        super();
    }

    run() {


        this.working = true;

        return true;

    }
}


