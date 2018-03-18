import {App, create, define, singleton, inject, EventDispatcher, mixins} from '../../index';
import chai = require('chai')

let should = chai.should();


describe('environments', function () {

    beforeEach(function () {

    });

    afterEach(function () {
    });


    it('should create dev environment ', async () => {

        let app = App.create({
            paths: ['config', 'server'],
            root: process.cwd() + '/test/mock'
        });
        await app.launch();

        should.exist(app.env.test);

        app.env.test.should.be.equal("testDev");
        app.env.type.should.be.equal("development")
    });


    it('should create production environment ', async () => {

        let app = await App.create({
            paths: ['config', 'server'],
            root: process.cwd() + '/test/mock',
            environment: 'production'
        }).launch();

        should.exist(app.env.test);

        app.env.test.should.be.equal("testProd");

        app.env.type.should.be.equal("production")


    });


    it('should create dev environment with deep config', async () => {

        let app = await App.create({
            paths: ['config', 'server'],
            root: process.cwd() + '/test/mock'
        }).launch();

        app.env.test.should.be.equal("testDev");

        should.exist(app.env.deep);

        app.env.deep.test.should.be.equal("working");

        app.env.deep.test2.should.be.equal("devWorking2");
        app.env.deep.test3.should.be.equal("working3");

    })

});