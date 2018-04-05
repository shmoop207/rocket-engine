"use strict";

import _ = require('lodash');
import fs = require('fs');
import {Injector, createContainer} from "appolo-inject";

export class Util {
    public static getClassName(fn: Function): string {
        return fn.name.charAt(0).toLowerCase() + fn.name.slice(1)
    }


    public static getFunctionArgs(func: (...args: any[]) => any) {

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


    public static async loadPathWithArgs(paths: string[], injector: Injector) {
        //let modulesPath = path.join(this._options.root, 'config/modules/modules.js');

        for (let path of paths) {
            if (!fs.existsSync(path)) {
                continue;
            }
            let modulesFunc = require(path);

            if (!_.isFunction(modulesFunc)) {
                continue;
            }
            let args = Util.getFunctionArgs(modulesFunc as any);

            let dependencies = _.map(args, (arg) => injector.getObject(arg));

            let result = modulesFunc.apply(modulesFunc, dependencies);

            //check for promise
            if (result && result.then) {
                await result;
            }
        }


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

    public static mixins(_klass: Function, mixins: Function | Function[]) {

        _.forEach(_.isArray(mixins) ? mixins : [mixins], (mixin) => {
            _(Object.getOwnPropertyNames(mixin.prototype))
                .without("constructor")
                .forEach(name => _klass.prototype[name] = mixin.prototype[name])

        });

    }

    // public static  statics(_klass:Function,key:{[index:string]:any}|string, value?:any) {
    //
    //
    //     let statics = {};
    //
    //     if (value) {
    //         statics[key as string] = value
    //     } else {
    //         statics = key;
    //     }
    //
    //     _.forEach(statics, (func, name) => {
    //
    //         Object.defineProperty(_klass, name, {
    //             get: function () {
    //                 return func
    //             }
    //         });
    //
    //         Object.defineProperty(_klass.prototype, name, {
    //             get: function () {
    //                 return func
    //             }
    //         });
    //     });
    //
    // }
    //
    // public static cloneArr<T>(a: T[]): T[] {
    //     let b = new Array(a.length);
    //     let i = a.length;
    //     while (i--) {
    //         b[i] = a[i];
    //     }
    //
    //     return b;
    // }


}


