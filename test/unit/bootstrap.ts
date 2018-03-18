import chai = require('chai');
import {Bootstrap} from "../mock/server/bootstrap";
import {App, create} from "../../index";

let should = chai.should();

describe('bootstrap', function () {

    let app: App;

    beforeEach(async () => {
        app = create({
            paths: ['config', 'server'],
            root: process.cwd() + '/test/mock'
        });

        await app.launch();
    });

    afterEach(function () {
    });


    it('should have  call bootstrap initialize', function () {

        let bootstrap = app.injector.getObject<Bootstrap>(Bootstrap);

        should.exist(bootstrap);
        should.exist(bootstrap.manager);
        bootstrap.manager.run().should.be.ok;
        bootstrap.working.should.be.ok;
    });
});