"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const chai = require("chai");
const bootstrap_1 = require("../mock/src/bootstrap");
const index_1 = require("../../index");
let should = chai.should();
describe('bootstrap', function () {
    let app;
    beforeEach(() => tslib_1.__awaiter(this, void 0, void 0, function* () {
        app = index_1.create({
            root: process.cwd() + '/test/mock'
        });
        yield app.launch();
    }));
    afterEach(function () {
    });
    it('should have  call bootstrap initialize', function () {
        let bootstrap = app.injector.getObject(bootstrap_1.Bootstrap);
        should.exist(bootstrap);
        should.exist(bootstrap.manager);
        bootstrap.manager.run().should.be.ok;
        bootstrap.working.should.be.ok;
    });
});
//# sourceMappingURL=bootstrap.js.map