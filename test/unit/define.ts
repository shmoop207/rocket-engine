"use strict";


import {Controller} from "../mock/src/controller";

let should = require('chai').should();
import {App, createApp, define, singleton, inject, EventDispatcher, mixins} from '../../index';
import {Manager2} from "../mock/src/manager2";
import Manager3 from "../mock/src/manager3";


describe('define', function () {
    let app: App;

    beforeEach(async () => {
        app = createApp({
            root: process.cwd() + '/test/mock'
        })


        await app.launch();
    });

    afterEach(function () {
    })


    it('should define class static config', function () {
        let manager2 = app.injector.getObject<Manager2>(Manager2);

        should.exist(manager2);
        should.exist(manager2.manager);
        manager2.manager.run().should.be.ok;
    })

    it('should define class with linq', function () {
        let manager3 = app.injector.getObject<Manager3>(Manager3);

        should.exist(manager3);
        should.exist(manager3.manager);
        manager3.manager.run().should.be.ok;

    });


    it('should call before decorator', async function () {
        let controller = app.injector.getObject<Controller>(Controller);

        let result = await controller.testBefore(2);
        let result2 = await controller.testAfter(2);

        result.should.be.eq(8)
        result2.should.be.eq(8)
    });

    it('should define mixsins', function () {

        class Test {
            on(event, fn) {
                return true;
            }

            un(event, fn) {
                return true;
            }
        }

        @mixins(Test)
        class Test2 {

        }


        let test = new Test2();
        (test as any).on().should.be.ok
    });

    it('should call pipeline decorator', async function () {
        let controller = app.injector.getObject<Controller>(Controller);

        let result = await controller.pipelineTest([]);

        result.should.be.deep.equals([2, 3, 1])
    });

    it('should call pipeline validate', async function () {
        let controller = app.injector.getObject<Controller>(Controller);

        let result = await controller.validateTest(6);

        result.should.be.eq(0);

        result = await controller.validateTest(5);

        result.should.be.eq(5)

    });

    it('should call pipeline validate arguments', async function () {
        let controller = app.injector.getObject<Controller>(Controller);

        let result = await controller.validateTest2(5,5);

        result.should.be.eq(10);

        result = await controller.validateTest2(6,7);

        result.should.be.eq(0);

        result = await controller.validateTest2(5,7);

        result.should.be.eq(5)



    });


});
