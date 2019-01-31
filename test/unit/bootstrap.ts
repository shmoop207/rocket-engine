import chai = require('chai');
import {Bootstrap} from "../mock/src/bootstrap";
import {App, createApp} from "../../index";

let should = chai.should();

describe('bootstrap', function () {

    let app: App;

    beforeEach(async () => {
        app = createApp({
            root: process.cwd() + '/test/mock'
        });

        await app.launch();
    });

    afterEach(function () {

        app.reset();
    });


    it('should have  call bootstrap initialize', function () {

        let bootstrap = app.injector.getObject<Bootstrap>(Bootstrap);
        let exportedClassEvent = app.injector.getObject<boolean>("exportedClassEvent");
        let nestedProvider = app.injector.getObject<any>("nestedProvider");

        should.exist(bootstrap);
        should.exist(bootstrap.manager);
        bootstrap.manager.run().should.be.ok;
        bootstrap.working.should.be.ok;
        exportedClassEvent.should.be.ok;
        nestedProvider.dbMock2.db.conn.should.be.eq("working");
    });


});