"use strict";
import {
    catchError,
    guardSum,
    GuardTest,
    interceptorMultiValue,
    interceptorTimeout,
    PipelineTest2,
    PipelineTestOnCreate, pipeMultiValue
} from "./pipelineTest";
import {pipelineInstance} from "../../../lib/pipelines/decoreators/pipelineDecorators";
import {define, singleton, inject, init} from '@appolo/inject';
import {EventDispatcher} from '@appolo/events';
import {Promises} from '@appolo/utils';

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

    @guardSum(5)
    public testGuard(value1: number, value2: number) {
        return value1 + value2
    }


    @interceptorTimeout(5)
    public async testInterceptorTimeout(value1: number, value2: number) {

        await Promises.delay(10)
        return value1 + value2
    }

    @interceptorMultiValue(2)
    public async testInterceptorMultiValue(value1: number, value2: number) {

        return value1 + value2
    }


    public async testPipeMultiValue(@pipeMultiValue(2) value1: number, value2: number) {

        return value1 + value2
    }

    @catchError()
    public async testCatchError(value1: number, value2: number):Promise<any> {

        throw  new Error("some error");
    }
}




