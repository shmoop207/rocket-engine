"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
class Util {
    static getClassName(fn) {
        return fn.name.charAt(0).toLowerCase() + fn.name.slice(1);
    }
    static getFunctionArgs(func) {
        const STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
        const ARGUMENT_NAMES = /([^\s,]+)/g;
        let fnStr = func.toString().replace(STRIP_COMMENTS, '');
        let args = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
        if (args === null) {
            args = [];
        }
        args = _.compact(args);
        return args;
    }
    // public static  namespace(namespace: string, value: any) {
    //     let properties = namespace.split('.');
    //
    //     let parent = global;
    //
    //     while (properties.length) {
    //         let property = properties.shift();
    //         if (typeof parent[property] === 'undefined') {
    //             parent[property] = {};
    //         }
    //
    //         if (properties.length == 0 && value) {
    //             parent[property] = value;
    //         }
    //         else {
    //             parent = parent[property];
    //         }
    //     }
    //
    //     return parent;
    // }
    static mixins(_klass, mixins) {
        _.forEach(_.isArray(mixins) ? mixins : [mixins], (mixin) => {
            _(Object.getOwnPropertyNames(mixin.prototype))
                .without("constructor")
                .forEach(name => _klass.prototype[name] = mixin.prototype[name]);
        });
    }
}
exports.Util = Util;
//# sourceMappingURL=util.js.map