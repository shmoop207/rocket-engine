"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.module = exports.AppModuleOptionsSymbol = exports.ModuleSymbol = void 0;
const path = require("path");
const util_1 = require("../util/util");
const inject_1 = require("@appolo/inject");
exports.ModuleSymbol = "__module__";
exports.AppModuleOptionsSymbol = "__appModuleOptionsSymbol__";
function module(options) {
    options = options || {};
    options.root = path.dirname(util_1.Util.callerPath());
    return function (fn) {
        inject_1.singleton()(fn);
        inject_1.define()(fn);
        Reflect.defineMetadata(exports.ModuleSymbol, options, fn);
    };
}
exports.module = module;
//# sourceMappingURL=moduleDecorators.js.map