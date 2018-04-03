"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const index_1 = require("../../index");
const chai = require("chai");
let should = chai.should();
describe('inject', function () {
    let app;
    beforeEach(() => tslib_1.__awaiter(this, void 0, void 0, function* () {
        app = index_1.App.create({
            root: process.cwd() + '/test/mock'
        });
        yield app.launch();
    }));
    afterEach(function () {
    });
    it('should have  injector', function () {
        should.exist(app.injector);
    });
    it('should have env in injector', function () {
        let env = app.injector.getObject('env');
        should.exist(env);
        env.type.should.be.equal("development");
    });
    it('should have controller in injector', function () {
        let controller = app.injector.getObject('controller');
        should.exist(controller);
        should.exist(controller.manager);
        controller.manager.run().should.be.ok;
        controller.logger2.getName().should.be.eq("testDevlogger2");
    });
    it('should  controller be singleton', function () {
        let controller = app.injector.getObject('controller');
        let controller2 = app.injector.getObject('controller');
        let manager = app.injector.getObject('manager');
        let manager2 = app.injector.getObject('manager');
        (controller !== controller2).should.be.ok;
        (manager === manager2).should.be.ok;
    });
});
//# sourceMappingURL=inject.js.map