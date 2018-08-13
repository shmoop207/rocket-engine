"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const util_1 = require("../util/util");
exports.ModuleSymbol = "__module__";
function module(options) {
    options = options || {};
    options.root = path.dirname(util_1.Util.callerPath());
    return function (fn) {
        Reflect.defineMetadata(exports.ModuleSymbol, options, fn);
    };
}
exports.module = module;
//# sourceMappingURL=module.js.map