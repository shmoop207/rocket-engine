"use strict";
import { before} from '../../../../index';
import {Manager} from "../manager";
import {define, singleton,inject,initMethod,IFactory,factory}  from '@appolo/inject';
import {EventDispatcher}  from '@appolo/events';

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



