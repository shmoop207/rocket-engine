"use strict";
import {Manager} from "../../../../src/manager";
import {Logger2} from "../../logger2";
import {BeforeTest} from "../../../../src/beforeTest";
import {PipelineTest, PipelineTest2} from "../../../../src/pipelineTest";
import {validate} from "../../validate/validateModule";
import {define, singleton,inject,initMethod,IFactory,factory}  from '@appolo/inject';
import {EventDispatcher}  from '@appolo/events';

export class Base2Controller extends EventDispatcher {

    async validateBase(@validate(5) value: number, @validate(6)value2: number) {
        return value + value2;
    }
}

export class BaseController extends Base2Controller {


}






