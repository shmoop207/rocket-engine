"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appolo = require("../../index");
const chai = require("chai");
const index_1 = require("../../index");
const appolo_utils_1 = require("appolo-utils");
let should = chai.should();
describe("event dispatcher", function () {
    class EventHandler {
        constructor(dispatcher) {
            this.dispatcher = dispatcher;
        }
        handle() {
            this.dispatcher.un('topic', this.handle, this);
        }
    }
    it('can un-subscribe from event while handling the event itself', function () {
        let dispatcher = new appolo.EventDispatcher();
        let handler1 = new EventHandler(dispatcher);
        let handler2 = new EventHandler(dispatcher);
        dispatcher.on('topic', handler1.handle, handler1);
        dispatcher.on('topic', handler2.handle, handler2);
        (function () {
            dispatcher.fireEvent('topic');
        }).should.not.throw();
        // dispatcher.fireEvent('topic').should.not.throw();
    });
    it("should fire event with params", async () => {
        let value = 0;
        class EventHandler extends index_1.EventDispatcher {
            constructor() {
                super();
                setTimeout(() => this.fireEvent("test", 5), 100);
            }
        }
        let a = new EventHandler();
        a.on("test", (v) => value = v);
        await appolo_utils_1.Promises.delay(150);
        value.should.be.eq(5);
    });
    it("should subscribe with fire event with params", async () => {
        let value = 0;
        class EventHandler extends index_1.EventDispatcher {
            constructor() {
                super();
                setTimeout(() => this.fireEvent("test", 5), 100);
            }
        }
        let a = new EventHandler();
        let fn = (v) => value = v;
        a.on("test", fn);
        await appolo_utils_1.Promises.delay(10);
        a.un("test", fn);
        await appolo_utils_1.Promises.delay(140);
        value.should.be.eq(0);
    });
    it("should removeAllListeners with fire event with params", async () => {
        let value = 0;
        class EventHandler extends index_1.EventDispatcher {
            constructor() {
                super();
                setTimeout(() => this.fireEvent("test", 5), 100);
            }
        }
        let a = new EventHandler();
        let fn = ((v) => value = v);
        a.on("test", fn);
        await appolo_utils_1.Promises.delay(10);
        a.removeAllListeners();
        await appolo_utils_1.Promises.delay(140);
        value.should.be.eq(0);
    });
});
//# sourceMappingURL=eventDispatcher.js.map