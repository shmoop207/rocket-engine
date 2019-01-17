import sinon = require('sinon');
import sinonChai = require('sinon-chai');
import chai = require('chai');
import {App, createApp, Events} from "../../index";

chai.use(sinonChai);
let should = chai.should();

describe('events', function () {

    let app: App;

    beforeEach(async () => {
        app = createApp({
            root: process.cwd() + '/test/mock'
        });

    });

    afterEach(function () {
    });


    it('should have  events', async function () {


        let spy = sinon.spy();

        for (let key in Events) {
            app.once(Events[key], spy);

        }


        await app.launch();

        app.reset();


        spy.should.callCount(Object.keys(Events).length)
    });
});