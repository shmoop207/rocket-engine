"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Util = void 0;
const fs = require("fs");
const inject_1 = require("@appolo/inject");
const utils_1 = require("@appolo/utils");
class Util extends inject_1.Util {
    static async loadPathWithArgs(paths, injector) {
        for (let path of paths) {
            if (!fs.existsSync(path)) {
                continue;
            }
            let modulesFunc = require(path);
            if (!utils_1.Classes.isFunction(modulesFunc)) {
                continue;
            }
            let args = Util.getFunctionArgs(modulesFunc);
            let dependencies = args.map(arg => injector.getObject(arg));
            let result = modulesFunc.apply(modulesFunc, dependencies);
            //check for promise
            if (result && result.then) {
                await result;
            }
        }
    }
    static stack() {
        return utils_1.Errors.stack();
    }
    static callerPath() {
        let stack = Util.stack();
        return stack[4] && stack[4].getFileName ? stack[4].getFileName() : "";
    }
    static logger(injector) {
        if (injector.getDefinition("logger")) {
            let logger = injector.get("logger");
            return logger.info && logger.error ? logger : console;
        }
        return console;
    }
}
exports.Util = Util;
//# sourceMappingURL=util.js.map