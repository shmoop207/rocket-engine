"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Discovery = void 0;
const utils_1 = require("@appolo/utils");
const inject_1 = require("@appolo/inject");
class Discovery {
    constructor(app) {
        this._app = app;
        this._exported = [];
    }
    get exported() {
        return this._exported;
    }
    addExported(value) {
        this.exported.push(value);
    }
    get exportedRoot() {
        let parent = this._app;
        let exported = [];
        while (parent != null) {
            exported.push(...parent.discovery.exported);
            parent = parent.parent;
        }
        return exported;
    }
    filterByType(type) {
        return this._exported.filter(item => item.fn === type);
    }
    findByType(type) {
        return this._exported.find(item => item.fn === type);
    }
    findReflectData(symbol) {
        return utils_1.Reflector.findReflectData(symbol, this._exported);
    }
    findAllReflectData(symbol) {
        return utils_1.Reflector.findAllReflectData(symbol, this._exported);
    }
    setReflectMetadata(key, value, target, propertyKey) {
        return Discovery.setReflectMetadata(key, value, target, propertyKey);
    }
    static setReflectMetadata(key, value, target, propertyKey) {
        return utils_1.Reflector.setMetadata(key, value, target, propertyKey);
    }
    getReflectMetadata(symbol, klass, propertyName, defaultValue) {
        return Discovery.getReflectMetadata(symbol, klass, propertyName, defaultValue);
    }
    static getReflectMetadata(symbol, klass, propertyName, defaultValue) {
        return utils_1.Reflector.getMetadata(symbol, klass, propertyName, defaultValue);
    }
    decorateReflectMetadata(key, value) {
        return Discovery.decorateReflectMetadata(key, value);
    }
    static decorateReflectMetadata(key, value) {
        return utils_1.Reflector.decorateMetadata(key, value);
    }
    getClassDefinition(fn) {
        return Discovery.getClassDefinition(fn);
    }
    static getClassDefinition(fn) {
        return inject_1.Util.getClassDefinition(fn);
    }
    getClassId(fn) {
        return Discovery.getClassId(fn);
    }
    static getClassId(fn) {
        return inject_1.Util.getClassId(fn);
    }
    getClassName(fn) {
        return Discovery.getClassName(fn);
    }
    static getClassName(fn) {
        return inject_1.Util.getClassName(fn);
    }
    reset() {
        this._exported = [];
    }
}
exports.Discovery = Discovery;
//# sourceMappingURL=discovery.js.map