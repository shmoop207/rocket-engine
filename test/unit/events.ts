import sinon = require('sinon');
import sinonChai = require('sinon-chai');
import chai = require('chai');
import {App, createApp} from "../../index";
import {Event, IEvent} from "@appolo/events/index";
import {
    EventBeforeInjectRegister,
    EventBeforeModuleInit, EventClassExport, EventInjectRegister,
    EventModuleExport,
    EventModuleInit
} from "../../lib/interfaces/events";

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

        app.events.onModuleExport.once(spy);
        app.events.beforeModuleInitialize.once(spy);
        app.events.afterModuleInitialize.once(spy);
        app.events.beforeModulesLoad.once(spy);
        app.events.afterModulesLoaded.once(spy);
        app.events.beforeInjectorInitialize.once(spy);
        app.events.afterInjectorInitialize.once(spy);
        app.events.beforeBootstrap.once(spy);
        app.events.afterBootstrap.once(spy);
        app.events.beforeInjectRegister.once(spy);
        app.events.onClassExport.once(spy);
        app.events.afterInjectRegister.once(spy);
        app.events.beforeReset.once(spy);
        app.events.afterReset.once(spy);


        await app.launch();

        await app.reset();

        app["resetTestEvent"].should.be.ok
        app["resetTest"].should.be.ok


        spy.should.callCount(14)
    });
});
