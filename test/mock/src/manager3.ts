"use strict";
import {define, singleton, inject, EventDispatcher,before} from '../../../index';
import {Manager} from "./manager";

@define()
@singleton()
export default class Manager3 extends EventDispatcher {

    @inject() manager: Manager;

    constructor() {
        super();
    }

    run() {


    }
}



