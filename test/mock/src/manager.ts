"use strict";
import {define, singleton, inject, EventDispatcher, pipeline} from '../../../index';
import {PipelineTest2, PipelineTestOnCreate} from "./pipelineTest";
import {pipelineInstance} from "../../../lib/decoretors/pipeline";

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


