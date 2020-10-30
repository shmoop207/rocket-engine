"use strict";


import {Controller} from "../mock/src/controller";
import {bind, cache, debounce, delay, once, throttle,mixins} from "@appolo/helpers";
import {Promises} from "@appolo/utils";

let should = require('chai').should();
import {App, createApp} from '../../index';
import {Manager2} from "../mock/src/manager2";
import Manager3 from "../mock/src/manager/manager3";
import {Manager} from "../mock/src/manager";
import Manager4 from "../mock/src/manager/manager4";


describe('Pipeline', function () {
    let app: App;

    beforeEach(async () => {
        app = createApp({
            root: process.cwd() + '/test/mock'
        });


        await app.launch();
    });

    afterEach(async function () {

        await app.reset();

    });




    it('should call pipeline decorator', async function () {
        let controller = app.injector.getObject<Controller>(Controller);

        let result = await controller.pipelineTest([]);

        result.should.be.deep.equals([2, 3, 1])
    });

    it('should call guard decorator', async function () {
        let manager = app.injector.getObject<Manager>(Manager);

        let result = await manager.testGuard(1,2);

        result.should.be.deep.equals(3);

        let [err] = await Promises.to<Error,any>(manager.testGuard(1,4) as any)
        err.message.should.be.eq("Forbidden resource")

    });

    it('should call interceptor decorator', async function () {
        let manager = app.injector.getObject<Manager>(Manager);

        let [err] = await Promises.to<number,Error>(manager.testInterceptorTimeout(1,2));

        err.message.should.be.eq("promise timeout")
    });

    it('should call interceptor decorator change after', async function () {
        let manager = app.injector.getObject<Manager>(Manager);

       let result =  await manager.testInterceptorMultiValue(1,2)

        result.should.be.eq(6)
    });

    it('should call pipe decorator', async function () {
        let manager = app.injector.getObject<Manager>(Manager);

        let result =  await manager.testPipeMultiValue(1,2)

        result.should.be.eq(4)
    });

    it('should call exception decorator', async function () {
        let manager = app.injector.getObject<Manager>(Manager);

        let result =  await manager.testCatchError(1,2)

        result.message.should.be.eq("some error")
    });


    it('should call pipe decorator on all class Methods', async function () {
        let manager = app.injector.getObject<Manager4>(Manager4);

        let result =  await manager.run(1)

        result.should.be.eq(2)

        let result2 =  await manager.run2(5)

        result2.should.be.eq(10)

        let result3 =  await manager._run3(3)

        result3.should.be.eq(3)
    });


    it('should call pipeline decorator in order params', async function () {
        let controller = app.injector.getObject<Controller>(Controller);

        let result = await controller.pipelineTest2([]);

        result.should.be.deep.equals([3, 2, 1])
    });

    it('should call pipeline validate', async function () {
        let controller = app.injector.getObject<Controller>(Controller);

        let result = await controller.validateTest(6);

        result.should.be.eq(0);

        result = await controller.validateTest(5);

        result.should.be.eq(5)

    });

    it('should call pipeline on create', async function () {
        let manager = app.injector.getObject<Manager>(Manager);


        (manager as any).onCreateTest.should.be.ok

    });

    it('should call pipeline validate arguments', async function () {
        let controller = app.injector.getObject<Controller>(Controller);

        let result = await controller.validateTest2(5, 5);

        result.should.be.eq(10);

        result = await controller.validateTest2(6, 7);

        result.should.be.eq(0);

        result = await controller.validateTest2(5, 7);

        result.should.be.eq(5)


    });

    it('should call base class pipeline validate arguments', async function () {
        let controller = app.injector.getObject<Controller>(Controller);

        let result = await controller.validateBase(5, 5);

        result.should.be.eq(10);

        result = await controller.validateBase(6, 7);

        result.should.be.eq(0);

        result = await controller.validateBase(5, 7);

        result.should.be.eq(5)


    });


});
