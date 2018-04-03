"use strict";
import {App, create, define, singleton, inject, EventDispatcher,mixins} from '../../index';
import chai = require('chai')
import {IEnv} from "../../lib/IEnv";
import {Controller} from "../mock/src/controller";
import {Manager} from "../mock/src/manager";

let should = chai.should();

describe('inject', function () {
    let app:App;

    beforeEach(async()=>{
        app = App.create({
            root:process.cwd() +'/test/mock'
        });

        await app.launch();
    });

    afterEach(function(){
    });

    it('should have  injector', function () {

        should.exist(app.injector)

    });

    it('should have env in injector', function () {

        let env = app.injector.getObject<IEnv>('env');

        should.exist(env);

        env.type.should.be.equal("development")

    });

    it('should have controller in injector', function () {

        let controller = app.injector.getObject<Controller>('controller');

        should.exist(controller);
        should.exist(controller.manager);
        controller.manager.run().should.be.ok;
        controller.logger2.getName().should.be.eq("testDevlogger2")
    });

    it('should  controller be singleton', function () {

        let controller = app.injector.getObject<Controller>('controller');
        let controller2 = app.injector.getObject<Controller>('controller');

        let manager = app.injector.getObject<Manager>('manager');
        let manager2 = app.injector.getObject<Manager>('manager');

        (controller !==controller2).should.be.ok;
        (manager === manager2).should.be.ok;


    });

});

