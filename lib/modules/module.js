"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const rocket_inject_1 = require("rocket-inject");
class Module {
    constructor() {
        this._injector = rocket_inject_1.createContainer();
    }
    initialize() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
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