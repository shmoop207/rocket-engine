"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
class ReflectUtils {
    static findReflectData(symbol, exported) {
        for (let i = 0, len = (exported ? exported.length : 0); i < len; i++) {
            let result = Reflect.getOwnMetadata(symbol, exported[i].fn);
            if (result !== undefined) {
                return Object.assign({}, exported[i], { metaData: result });
            }
        }
        return null;
    }
    static findAllReflectData(symbol, exported) {
        let results = [];
        for (let i = 0, len = (exported ? exported.length : 0); i < len; i++) {
            let result = Reflect.getOwnMetadata(symbol, exported[i].fn);
            if (result !== undefined) {
                results.push(Object.assign({}, exported[i], { metaData: result }));
            }
        }
        return results;
    }
    static setReflectMetadata(key, value, target, propertyKey) {
        if (propertyKey) {
            Reflect.defineMetadata(key, value, target.constructor, propertyKey);
        }
        else {
            Reflect.defineMetadata(key, value, target.constructor);
        }
    }
    static getReflectMetadata(symbol, klass, propertyName, defaultValue) {
        let value = Reflect.getOwnMetadata(symbol, klass, propertyName);
        if (!value && Reflect.hasMetadata(symbol, klass, propertyName)) {
            value = _.cloneDeep(Reflect.getMetadata(symbol, klass, propertyName));
            Reflect.defineMetadata(symbol, value, klass, propertyName);
        }
        if (!value && defaultValue != undefined) {
            value = defaultValue;
            Reflect.defineMetadata(symbol, value, klass, propertyName);
        }
        return value;
    }
    static decorateReflectMetadata(key, value) {
        return function (target, propertyKey) {
            ReflectUtils.setReflectMetadata(key, value, target, propertyKey);
        };
    }
}
exports.ReflectUtils = ReflectUtils;
//# sourceMappingURL=reflectUtils.js.map