"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
let should = require('chai').should();
const index_1 = require("../../index");
const manager2_1 = require("../mock/server/manager2");
const manager3_1 = require("../mock/server/manager3");
describe('define', function () {
    let app;
    beforeEach(() => tslib_1.__awaiter(this, void 0, void 0, function* () {
        app = index_1.create({
            paths: ['config', 'server'],
            root: process.cwd() + '/test/mock'
        });
        yield app.launch();
    }));
    afterEach(function () {
    });
    it('should define class static config', function () {
        let manager2 = app.injector.getObject(manager2_1.Manager2);
        should.exist(manager2);
        should.exist(manager2.manager);
        manager2.manager.run().should.be.ok;
    });
    it('should define class with linq', function () {
        let manager3 = app.injector.getObject(manager3_1.default);
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
        let Test2 = class Test2 {
        };
        Test2 = tslib_1.__decorate([
            index_1.mixins(Test)
        ], Test2);
        let test = new Test2();
        test.on().should.be.ok;
    });
});
//# sourceMappingURL=define.js.map