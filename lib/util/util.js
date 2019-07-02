"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const fs = require("fs");
const appolo_inject_1 = require("appolo-inject");
const reflector_1 = require("./reflector");
class Util extends appolo_inject_1.Util {
    static async loadPathWithArgs(paths, injector) {
        for (let path of paths) {
            if (!fs.existsSync(path)) {
                continue;
            }
            let modulesFunc = require(path);
            if (!_.isFunction(modulesFunc)) {
                continue;
            }
            let args = Util.getFunctionArgs(modulesFunc);
            let dependencies = _.map(args, (arg) => injector.getObject(arg));
            let result = modulesFunc.apply(modulesFunc, dependencies);
            //check for promise
            if (result && result.then) {
                await result;
            }
        }
    }
    static stack() {
        let pst = Error.prepareStackTrace;
        Error.prepareStackTrace = function (_, stack) {
            Error.prepareStackTrace = pst;
            return stack;
        };
        let stack = (new Error()).stack;
        return stack;
    }
    static callerPath() {
        let stack = Util.stack();
        return stack[3] && stack[3].getFileName ? stack[3].getFileName() : "";
    }
    static mixins(_klass, mixins) {
        _.forEach(_.isArray(mixins) ? mixins : [mixins], (mixin) => {
            _(Object.getOwnPropertyNames(mixin.prototype))
                .without("constructor")
                .forEach(name => _klass.prototype[name] = mixin.prototype[name]);
        });
    }
    static delay(delay) {
        return new Promise((resolve) => setTimeout(resolve, delay));
    }
    static logger(injector) {
        if (injector.getDefinition("logger")) {
            let logger = injector.get("logger");
            return logger.info && logger.error ? logger : console;
        }
        return console;
    }
    static findReflectData(symbol, exported) {
        return reflector_1.Reflector.findReflectData(symbol, exported);
    }
    static findAllReflectData(symbol, exported) {
        return reflector_1.Reflector.findAllReflectData(symbol, exported);
    }
    static setReflectMetadata(key, value, target, propertyKey) {
        return reflector_1.Reflector.setMetadata(key, value, target, propertyKey);
    }
    static getReflectMetadata(symbol, klass, propertyName, defaultValue) {
        return reflector_1.Reflector.getMetadata(symbol, klass, propertyName, defaultValue);
    }
    static decorateReflectMetadata(key, value) {
        return reflector_1.Reflector.decorateMetadata(key, value);
    }
}
exports.Util = Util;
//# sourceMappingURL=util.js.map