"use strict";


let should = require('chai').should();
import {App, create, define, singleton, inject, EventDispatcher,mixins} from '../../index';
import {Manager2} from "../mock/server/manager2";
import Manager3 from "../mock/server/manager3";


describe('define', function () {
    let app: App;

    beforeEach(async () => {
        app = create({
            paths: ['config', 'server'],
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


});