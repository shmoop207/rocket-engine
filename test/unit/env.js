"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const index_1 = require("../../index");
const chai = require("chai");
let should = chai.should();
describe('environments', function () {
    beforeEach(function () {
    });
    afterEach(function () {
    });
    it('should create dev environment ', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
        let app = index_1.App.create({
            paths: ['config', 'server'],
            root: process.cwd() + '/test/mock'
        });
        yield app.launch();
        should.exist(app.env.test);
        app.env.test.should.be.equal("testDev");
        app.env.type.should.be.equal("development");
    }));
    it('should create production environment ', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
        let app = yield index_1.App.create({
            paths: ['config', 'server'],
            root: process.cwd() + '/test/mock',
            environment: 'production'
        }).launch();
        should.exist(app.env.test);
        app.env.test.should.be.equal("testProd");
        app.env.type.should.be.equal("production");
    }));
    it('should create dev environment with deep config', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
        let app = yield index_1.App.create({
            paths: ['config', 'server'],
            root: process.cwd() + '/test/mock'
        }).launch();
        app.env.test.should.be.equal("testDev");
        should.exist(app.env.deep);
        app.env.deep.test.should.be.equal("working");
        app.env.deep.test2.should.be.equal("devWorking2");
        app.env.deep.test3.should.be.equal("working3");
    }));
});
//# sourceMappingURL=env.js.map