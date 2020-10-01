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

        app.eventModuleExport.once(spy);
        app.eventBeforeModuleInit.once(spy);
        app.eventModuleInit.once(spy);
        app.eventBeforeModulesLoad.once(spy);
        app.eventModulesLoaded.once(spy);
        app.eventBeforeInjectorInit.once(spy);
        app.eventInjectorInit.once(spy);
        app.eventBeforeBootstrap.once(spy);
        app.eventBootstrap.once(spy);
        app.eventsBeforeInjectRegister.once(spy);
        app.eventsEventClassExport.once(spy);
        app.eventsInjectRegister.once(spy);
        app.eventsBeforeReset.once(spy);
        app.eventsReset.once(spy);


        await app.launch();

        await app.reset();

        app["resetTestEvent"].should.be.ok
        app["resetTest"].should.be.ok


        spy.should.callCount(14)
    });
});
