"use strict";
import {PipelineTest2, PipelineTestOnCreate} from "./pipelineTest";
import {pipelineInstance} from "../../../lib/decoretors/pipelineDecorators";
import {define, singleton,inject,init}  from '@appolo/inject';
import {EventDispatcher}  from '@appolo/events';

@define()
@singleton()
@pipelineInstance(PipelineTestOnCreate)
export class Manager extends EventDispatcher {

    working: boolean

    constructor() {
        super();
    }

    run() {


        this.working = true;

        return true;

    }
}


