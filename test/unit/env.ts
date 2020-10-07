import {App} from '../../index';
import chai = require('chai')
import {IEnv} from "../mock/config/env/IEnv";

let should = chai.should();


describe('environments', function () {

    beforeEach(function () {

    });

    afterEach(function () {
    });


    it('should create dev environment ', async () => {

        let app = App.create({
            root: process.cwd() + '/test/mock'
        });
        await app.launch();

        should.exist((app.env as IEnv).test);

        (app.env as IEnv).test.should.be.equal("testDev");
        app.env.type.should.be.equal("development")
    });


    it('should create production environment ', async () => {

        let app = await App.create({
            root: process.cwd() + '/test/mock',
            environment: 'production'
        }).launch();

        should.exist((app.env as IEnv).test);

        (app.env as IEnv).test.should.be.equal("testProd");

        app.env.type.should.be.equal("production")


    });


    xit('should create dev environment with deep config', async () => {

        let app = await App.create({
            root: process.cwd() + '/test/mock'
        }).launch();

        (app.env as IEnv).test.should.be.equal("testDev");

        should.exist((app.env as IEnv).deep);

        (app.env as IEnv).deep.test.should.be.equal("working");

        (app.env as IEnv).deep.test2.should.be.equal("devWorking2");
        (app.env as IEnv).deep.test3.should.be.equal("working3");

    })

});
