"use strict";
import {define, singleton,inject,initMethod,IFactory,factory}  from '@appolo/inject';
import {EventDispatcher}  from '@appolo/events';

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

