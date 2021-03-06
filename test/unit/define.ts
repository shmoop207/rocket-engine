"use strict";


import {Controller} from "../mock/src/controller";
import {bind, cache, debounce, delay, once, throttle,mixins} from "@appolo/helpers";
import {Promises} from "@appolo/utils";

let should = require('chai').should();
import {App, createApp} from '../../index';
import {Manager2} from "../mock/src/manager2";
import Manager3 from "../mock/src/manager/manager3";
import {Manager} from "../mock/src/manager";


describe('define', function () {
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


    it('should define class static config', function () {
        let manager2 = app.injector.getObject<Manager2>(Manager2);

        should.exist(manager2);
        should.exist(manager2.manager);
        manager2.manager.run().should.be.ok;
    });

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
            private a: number

            constructor() {
                this.a = 1
            }

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

        interface Test2 extends Test {
        }


        let test = new Test2();
        test.on.should.be.ok
    });



});
