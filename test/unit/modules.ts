"use strict";
import chai = require('chai');
import {App, createApp} from "../../index";

let should = chai.should();

describe('modules', function () {
    let app: App;


    beforeEach(async () => {
        app = createApp({
            root: process.cwd() + '/test/mock'
        });

        await app.launch();
    });

    afterEach(function () {
    })

    it('should initialize module', function () {

        let logger = app.injector.getObject('logger');

        should.exist(logger);

        (logger as any).getName().should.be.eq("testDev");
    });


    it('should initialize module second module depend on the first module', function () {

        let logger2 = app.injector.getObject('logger2');
        should.exist(logger2);
        (logger2 as any).getName().should.be.eq("testDevlogger2");
    });

    it('should initialize module async module depend on the second module', function () {

        let logger3 = app.injector.getObject('logger3');
        should.exist(logger3);
        (logger3 as any).getName().should.be.eq("testDevlogger2logger3");
    });

    it('should initialize module final module depend on the async module', function () {

        let logger = app.injector.getObject('logger5');
        should.exist(logger);
        (logger as any).getName().should.be.eq("testDevlogger2logger4logger5");
    });

    it('should initialize module final module depend on the async await module', function () {

        let logger = app.injector.getObject('logger6');
        should.exist(logger);
        (logger as any).getName().should.be.eq("testDevlogger6");
    });

    it('should initialize module final module depend on the async await with inject module', function () {

        let logger = app.injector.getObject('logger7');
        should.exist(logger);
        (logger as any).getName().should.be.eq("testDevtestDevlogger6logger7");
    });

    it('should inject external module', function () {

        let test = app.injector.getObject('test');
        should.exist(test);
        (test as any).name.should.be.eq("working");
    });

    it('should inject external async module', function () {

        let test = app.injector.getObject('delay');
        should.not.exist(app.injector.getDefinition('delayManager'));
        should.exist(test);
        (test as any).name.should.be.eq("delaydevelopment1");
    });

});