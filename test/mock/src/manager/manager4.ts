"use strict";
import { before} from '../../../../index';
import {Manager} from "../manager";
import {define, singleton,inject,init,IFactory,factory}  from '@appolo/inject';
import {EventDispatcher}  from '@appolo/events';
import {pipeMultiValue} from "../pipelineTest";

@define()
@singleton()
@pipeMultiValue(2)
export default class Manager4 extends EventDispatcher {



    constructor() {
        super();
    }

    run(value:number) {
        return value

    }

    run2(value:number) {
        return value
    }

    _run3(value:number) {
        return value
    }
}



