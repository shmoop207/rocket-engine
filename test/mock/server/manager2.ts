"use strict";
import {define, singleton, inject, EventDispatcher} from '../../../index';

import {Manager} from "./manager";

@define()
@singleton()
export class Manager2 extends EventDispatcher {


    @inject() manager: Manager

    constructor() {


        super();
    }

    run() {
        return this.manager.run()

    }
}

