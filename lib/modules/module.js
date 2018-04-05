"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const appolo_inject_1 = require("appolo-inject");
const _ = require("lodash");
const Q = require("bluebird");
class Module {
    constructor() {
        this._injector = appolo_inject_1.createContainer();
    }
    get imports() {
        return [];
    }
    get exports() {
        return [];
    }
    get injector() {
        return this._injector;
    }
    initialize(parent) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield Q.map(this.imports, module => {
                return module.initialize(this._injector);
            });
            if (!parent) {
                return;
            }
            _.forEach(this.exports, item => {
                let define = Reflect.getMetadata(appolo_inject_1.InjectDefineSymbol, item);
                if (define) {
                    parent.addDefinition(define.definition.id, { injector: this._injector });
                }
            });
            yield this._injector.initialize();
        });
    }
    launch() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.Module = Module;
//# sourceMappingURL=module.js.map