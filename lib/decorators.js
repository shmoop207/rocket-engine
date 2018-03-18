"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const util_1 = require("./util/util");
exports.BootstrapSymbol = Symbol("__bootstrap__");
exports.ModuleSymbol = Symbol("__module__");
function mixins(mixins) {
    return function (fn) {
        util_1.Util.mixins(fn, mixins);
    };
}
exports.mixins = mixins;
function module(options) {
    return function (fn) {
        Reflect.defineMetadata(exports.ModuleSymbol, options, fn);
    };
}
exports.module = module;
function bootstrap() {
    return function (fn) {
        Reflect.defineMetadata(exports.BootstrapSymbol, true, fn);
    };
}
exports.bootstrap = bootstrap;
//# sourceMappingURL=decorators.js.map