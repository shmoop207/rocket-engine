"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Util = void 0;
const fs = require("fs");
const utils_1 = require("@appolo/utils");
class Util {
    static filterByType(exported, type) {
        return (exported || []).filter(item => item.fn === type);
    }
    static findByType(exported, type) {
        return (exported || []).find(item => item.fn === type);
    }
    static findReflectData(exported, symbol) {
        return utils_1.Reflector.findReflectData(symbol, exported);
    }
    static findAllReflectData(exported, symbol) {
        return utils_1.Reflector.findAllReflectData(symbol, exported);
    }
    static setReflectMetadata(key, value, target, propertyKey) {
        return utils_1.Reflector.setMetadata(key, value, target, propertyKey);
    }
    static getReflectMetadata(symbol, klass, propertyName, defaultValue) {
        return utils_1.Reflector.getMetadata(symbol, klass, propertyName, defaultValue);
    }
    static decorateReflectMetadata(key, value) {
        return utils_1.Reflector.decorateMetadata(key, value);
    }
    static getClassDefinition(fn) {
        return Util.getClassDefinition(fn);
    }
    static getClassId(fn) {
        return Util.getClassId(fn);
    }
    static getClassName(fn) {
        return Util.getClassName(fn);
    }
    static async loadPathWithArgs(paths, injector) {
        for (let path of paths) {
            if (!fs.existsSync(path)) {
                continue;
            }
            let modulesFunc = require(path);
            if (!utils_1.Classes.isFunction(modulesFunc)) {
                continue;
            }
            let args = utils_1.Classes.functionArgsNames(modulesFunc);
            let dependencies = args.map(arg => injector.getObject(arg));
            let result = modulesFunc.apply(modulesFunc, dependencies);
            //check for promise
            if (result && result.then) {
                await result;
            }
        }
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