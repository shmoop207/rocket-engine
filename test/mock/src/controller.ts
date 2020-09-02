"use strict";
import {before, after, pipeline} from '../../../index';
import {Manager} from "./manager";
import {Logger2} from "../config/modules/logger2";
import {BeforeTest} from "./beforeTest";
import {PipelineTest, PipelineTest2} from "./pipelineTest";
import {validate} from "../config/modules/validate/validateModule";
import {BaseController} from "../config/modules/baseClass/src/baseController";
import {define, singleton,inject,initMethod,IFactory,factory}  from '@appolo/inject';

@define()
export class Controller extends BaseController {
    working: boolean;
    @inject() manager: Manager;
    @inject() logger2: Logger2;

    constructor() {
        super();
    }

    run() {

        this.working = true;
    }

    @before<BeforeTest>(BeforeTest, c => c.run)
    async testBefore(num: number) {

        return num + 1
    }

    @after<BeforeTest>(BeforeTest, c => c.runAfter)
    async testAfter(num: number) {

        return num + 1
    }

    @pipeline(PipelineTest)
    @pipeline(PipelineTest2)
    async pipelineTest(arr: number[]) {
        arr.push(1);
        return arr;
    }



    async pipelineTest2(@pipeline(PipelineTest) @pipeline(PipelineTest2) arr: number[]) {
        arr.push(1);
        return arr;
    }


    @validate(5)
    async validateTest(value: number) {
        return value
    }

    async validateTest2(@validate(5) value: number,@validate(6)value2:number) {
        return value + value2;

    }

}



