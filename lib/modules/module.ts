import {Injector, createContainer} from "rocket-inject";
import   _ = require('lodash');
import   Q = require('bluebird');
import {InjectDefineSymbol, Define} from "rocket-inject/index";

export class Module {

    protected _injector: Injector;

    constructor() {
        this._injector = createContainer();
    }

    public get imports():Module[]{
        return [];
    }

    public get exports():any[]{
        return [];
    }

    public get injector(): Injector {
        return this._injector;
    }

    public async initialize(parent?: Injector) {

        await Q.map(this.imports, module => {

            return module.initialize(this._injector)
        });

        if (!parent) {
            return;
        }

        _.forEach(this.exports, item => {

            let define = Reflect.getMetadata(InjectDefineSymbol, item) as Define;

            if (define) {
                parent.addDefinition(define.definition.id, {injector: this._injector})
            }

        });

        await this._injector.initialize();
    }

    public async launch() {

    }

}