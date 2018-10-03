"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai = require("chai");
const index_1 = require("../../index");
const bootstrap_1 = require("../mock/src/bootstrap");
let should = chai.should();
describe('modules', function () {
    let app;
    beforeEach(async () => {
        app = index_1.createApp({
            root: process.cwd() + '/test/mock'
        });
        await app.launch();
    });
    afterEach(function () {
        app.reset();
    });
    it('should initialize module', function () {
        let logger = app.injector.getObject('logger');
        should.exist(logger);
        logger.getName().should.be.eq("testDev");
    });
    it('should initialize module second module depend on the first module', function () {
        let logger2 = app.injector.getObject('logger2');
        should.exist(logger2);
        logger2.getName().should.be.eq("testDevlogger2");
    });
    it('should initialize module async module depend on the second module', function () {
        let logger3 = app.injector.getObject('logger3');
        should.exist(logger3);
        logger3.getName().should.be.eq("testDevlogger2logger3");
    });
    it('should initialize module final module depend on the async module', function () {
        let logger = app.injector.getObject('logger5');
        should.exist(logger);
        logger.getName().should.be.eq("testDevlogger2logger4logger5");
    });
    it('should initialize module final module depend on the async await module', function () {
        let logger = app.injector.getObject('logger6');
        should.exist(logger);
        logger.getName().should.be.eq("testDevlogger6");
    });
    it('should initialize module final module depend on the async await with inject module', function () {
        let logger = app.injector.getObject('logger7');
        should.exist(logger);
        logger.getName().should.be.eq("testDevtestDevlogger6logger7");
    });
    it('should inject external module', function () {
        let test = app.injector.getObject('test');
        should.exist(test);
        test.name.should.be.eq("working");
    });
    it('should inject external async module', function () {
        let bootstrap = app.injector.getObject(bootstrap_1.Bootstrap);
        should.not.exist(app.injector.getDefinition('delayManager'));
        should.exist(bootstrap.delay);
        should.exist(bootstrap.dbMock);
        bootstrap.delay.data.msg.should.be.eq("testDev");
        bootstrap.delay2.data.msg.should.be.eq("testDev");
        bootstrap.delay2.data.time.should.be.lessThan(bootstrap.delay.data.time);
        bootstrap.dbMock.conn.should.be.eq("working");
        bootstrap.dbMock.name.should.be.eq("working");
        bootstrap.dbMock.bootstrap.should.be.ok;
        bootstrap.dbMock.time.should.be.greaterThan(bootstrap.delay.data.time);
    });
    it('should inject external async module with imports name ref', function () {
        let bootstrap = app.injector.getObject(bootstrap_1.Bootstrap);
        bootstrap.dbMock.env.should.be.eq("development");
    });
});
//# sourceMappingURL=modules.js.map