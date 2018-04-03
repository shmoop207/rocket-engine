"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const chai = require("chai");
const index_1 = require("../../index");
let should = chai.should();
describe('modules', function () {
    let app;
    beforeEach(() => tslib_1.__awaiter(this, void 0, void 0, function* () {
        app = index_1.create({
            root: process.cwd() + '/test/mock'
        });
        yield app.launch();
    }));
    afterEach(function () {
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
});
//# sourceMappingURL=plugins.js.map