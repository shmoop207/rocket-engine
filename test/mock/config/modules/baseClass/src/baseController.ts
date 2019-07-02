"use strict";
import {before, define, EventDispatcher, inject, after, pipeline} from '../../../../../../index';
import {Manager} from "../../../../src/manager";
import {Logger2} from "../../logger2";
import {BeforeTest} from "../../../../src/beforeTest";
import {PipelineTest, PipelineTest2} from "../../../../src/pipelineTest";
import {validate} from "../../validate/validateModule";


export class BaseController extends EventDispatcher {

    async validateBase(@validate(5) value: number,@validate(6)value2:number) {
        return value + value2;

    }
}



