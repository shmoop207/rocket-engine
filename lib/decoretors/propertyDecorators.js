"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setMetadata = exports.handleAfterDecorator = exports.handleBeforeDecorator = exports.after = exports.before = exports.AfterSymbol = exports.BeforeSymbol = void 0;
const utils_1 = require("@appolo/utils");
const inject_1 = require("@appolo/inject");
const discovery_1 = require("../discovery/discovery");
exports.BeforeSymbol = "__before__";
exports.AfterSymbol = "__after__";
function decorate(symbol, klass, action) {
    return function (target, propertyKey, descriptor) {
        let data = inject_1.Util.getReflectData(symbol, target.constructor, {});
        if (!data[propertyKey]) {
            data[propertyKey] = {
                items: [],
                propertyKey
            };
        }
        data[propertyKey].items.push({
            klass: klass,
            action: action
        });
    };
}
function before(klass, action) {
    return decorate(exports.BeforeSymbol, klass, action);
}
exports.before = before;
function after(klass, action) {
    return decorate(exports.AfterSymbol, klass, action);
}
exports.after = after;
function handleBeforeDecorator(target, app) {
    baseHandler(target, app, exports.BeforeSymbol, extendBefore);
}
exports.handleBeforeDecorator = handleBeforeDecorator;
function handleAfterDecorator(target, app) {
    baseHandler(target, app, exports.AfterSymbol, extendAfter);
}
exports.handleAfterDecorator = handleAfterDecorator;
function baseHandler(target, app, symbol, handler) {
    let meta = inject_1.Util.getReflectData(symbol, target);
    if (!meta) {
        return;
    }
    Object.keys(meta || {}).forEach(key => {
        let item = meta[key];
        if (item.isOverride) {
            return;
        }
        let old = target.prototype[item.propertyKey];
        item.isOverride = true;
        target.prototype[item.propertyKey] = handler(old, app, item);
    });
}
function extendAfter(old, app, item) {
    return async function () {
        let args = Array.from(arguments);
        let result = await old.apply(this, args);
        for (let action of item.items) {
            let handler = app.injector.get(action.klass);
            let handlerAction = utils_1.Classes.isFunction(action.action)
                ? action.action(handler)
                : handler[action.action || "run"];
            result = await handlerAction.apply(this, [result]);
        }
        return result;
    };
}
function extendBefore(old, app, item) {
    return async function () {
        let args = Array.from(arguments);
        for (let action of item.items) {
            let handler = app.injector.get(action.klass);
            let handlerAction = utils_1.Classes.isFunction(action.action)
                ? action.action(handler)
                : handler[action.action || "run"];
            args = await handlerAction.apply(handler, args);
            if (!Array.isArray(args)) {
                args = [args];
            }
        }
        return old.apply(this, args);
    };
}
function setMetadata(name, value) {
    return discovery_1.Discovery.decorateReflectMetadata(name, value);
}
exports.setMetadata = setMetadata;
//# sourceMappingURL=propertyDecorators.js.map