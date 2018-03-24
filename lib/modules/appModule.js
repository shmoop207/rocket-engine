"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const module_1 = require("./module");
class AppModule extends module_1.Module {
    constructor(injector, modules) {
        super();
        this.modules = modules;
        this._injector = injector;
    }
    get imports() {
        return [];
    }
}
exports.AppModule = AppModule;
//# sourceMappingURL=appModule.js.map