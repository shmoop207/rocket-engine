"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Discovery = void 0;
const utils_1 = require("@appolo/utils");
const inject_1 = require("@appolo/inject");
const index_1 = require("@appolo/inject/index");
class Discovery {
    constructor(app) {
        this._app = app;
        this._exported = [];
    }
    getRoot() {
        return this._app.tree.getRoot().discovery;
    }
    getParent() {
        return this._app.tree.getParent().discovery;
    }
    get exported() {
        return this._exported;
    }
    add(value) {
        this.exported.push(value);
    }
    filterByType(type) {
        return this._exported.filter(item => item.fn === type);
    }
    findByType(type) {
        return this._exported.find(item => item.fn === type);
    }
    findReflectData(symbol) {
        let item = utils_1.Reflector.findReflectData(symbol, this._exported);
        if (item && item.define && this._app.injector.hasInstance(item.define.id)) {
            item.instance = this._app.injector.getInstance(item.define.id);
        }
        return item;
    }
    findAllReflectData(symbol) {
        let items = utils_1.Reflector.findAllReflectData(symbol, this._exported);
        items.forEach(item => {
            if (item.define && this._app.injector.hasInstance(item.define.id)) {
                item.instance = this._app.injector.getInstance(item.define.id);
            }
        });
        return items;
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
    hasClassDefinition(fn) {
        return Discovery.hasClassDefinition(fn);
    }
    static hasClassDefinition(fn) {
        return Reflect.hasMetadata(index_1.InjectDefineSymbol, fn);
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