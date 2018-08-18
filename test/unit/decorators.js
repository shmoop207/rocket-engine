"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const chai = require("chai");
const Q = require("bluebird");
const index_1 = require("../../index");
let should = chai.should();
describe("decorator", function () {
    it('should call throttle', async () => {
        class Test {
            constructor() {
                this.test = 0;
            }
            handle() {
                return ++this.test;
            }
        }
        tslib_1.__decorate([
            index_1.throttle(10, { leading: false })
        ], Test.prototype, "handle", null);
        let test = new Test();
        test.handle();
        test.handle();
        test.handle();
        await Q.delay(11);
        test.test.should.be.eq(1);
    });
    it('should call debounce', async () => {
        class Test {
            constructor() {
                this.test = 0;
            }
            handle() {
                return ++this.test;
            }
        }
        tslib_1.__decorate([
            index_1.debounce(10)
        ], Test.prototype, "handle", null);
        let test = new Test();
        test.handle();
        test.handle();
        test.handle();
        await Q.delay(5);
        test.test.should.be.eq(0);
        await Q.delay(11);
        test.test.should.be.eq(1);
    });
    it('should call bind', async () => {
        class Test {
            constructor() {
                this.test = "test";
            }
            handle() {
                return this.test;
            }
        }
        tslib_1.__decorate([
            index_1.bind
        ], Test.prototype, "handle", null);
        let test = new Test();
        test.handle.call(null).should.be.eq("test");
    });
    it('should call delay', async () => {
        class Test {
            constructor() {
                this.test = 0;
            }
            handle() {
                return ++this.test;
            }
        }
        tslib_1.__decorate([
            index_1.delay(10)
        ], Test.prototype, "handle", null);
        let test = new Test();
        test.handle();
        await Q.delay(5);
        test.test.should.be.eq(0);
        await Q.delay(11);
        test.test.should.be.eq(1);
    });
    it('should call cache', async () => {
        class Test {
            constructor() {
                this.test = 0;
            }
            handle() {
                return ++this.test;
            }
        }
        tslib_1.__decorate([
            index_1.cache()
        ], Test.prototype, "handle", null);
        let test = new Test();
        test.handle();
        test.handle();
        test.handle();
        test.test.should.be.eq(1);
    });
    it('should call async cache', async () => {
        class Test {
            constructor() {
                this.test = 0;
            }
            async handle() {
                return ++this.test;
            }
        }
        tslib_1.__decorate([
            index_1.cache()
        ], Test.prototype, "handle", null);
        let test = new Test();
        await test.handle();
        await test.handle();
        await test.handle();
        test.test.should.be.eq(1);
    });
    it('should call async cache with expire', async () => {
        class Test {
            constructor() {
                this.test = 0;
            }
            async handle() {
                return ++this.test;
            }
        }
        tslib_1.__decorate([
            index_1.cache({ getMethod: "getByExpire", maxAge: 20 })
        ], Test.prototype, "handle", null);
        let test = new Test();
        await test.handle();
        await Q.delay(12);
        await test.handle();
        await test.handle();
        test.test.should.be.eq(2);
    });
    it('should call once', async () => {
        class Test {
            constructor() {
                this.test = 0;
                this.test2 = 0;
            }
            handle() {
                return ++this.test;
            }
            handle2() {
                return ++this.test2;
            }
        }
        tslib_1.__decorate([
            index_1.once()
        ], Test.prototype, "handle", null);
        tslib_1.__decorate([
            index_1.once(2)
        ], Test.prototype, "handle2", null);
        let test = new Test();
        test.handle();
        test.handle();
        test.handle();
        test.handle2();
        test.handle2();
        test.handle2();
        test.test.should.be.eq(1);
        test.test2.should.be.eq(2);
    });
});
//# sourceMappingURL=decorators.js.map