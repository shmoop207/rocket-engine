"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const chai = require("chai");
const index_1 = require("../../index");
chai.use(sinonChai);
let should = chai.should();
describe('events', function () {
    let app;
    beforeEach(async () => {
        app = index_1.createApp({
            root: process.cwd() + '/test/mock'
        });
    });
    afterEach(function () {
    });
    it('should have  events', async function () {
        let spy = sinon.spy();
        for (let key in index_1.Events) {
            app.once(index_1.Events[key], spy);
        }
        await app.launch();
        app.reset();
        spy.should.callCount(Object.keys(index_1.Events).length);
    });
});
//# sourceMappingURL=events.js.map