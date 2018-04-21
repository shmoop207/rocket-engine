"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai = require("chai");
const bootstrap_1 = require("../mock/src/bootstrap");
const index_1 = require("../../index");
let should = chai.should();
describe('bootstrap', function () {
    let app;
    beforeEach(async () => {
        app = index_1.createApp({
            root: process.cwd() + '/test/mock'
        });
        await app.launch();
    });
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