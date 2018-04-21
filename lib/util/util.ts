"use strict";

import _ = require('lodash');
import fs = require('fs');
import CallSite = NodeJS.CallSite;
import {Injector, Util as InjectUtil} from "appolo-inject";

export class Util extends InjectUtil {

    public static async loadPathWithArgs(paths: string[], injector: Injector) {

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


    public static stack(): CallSite[] {

        let pst = Error.prepareStackTrace;
        Error.prepareStackTrace = function (_, stack) {
            Error.prepareStackTrace = pst;
            return stack;
        };

        let stack = (new Error()).stack;

        return stack as any;
    }

    public static callerPath(): string {

        let stack = Util.stack();

        return stack[3] && stack[3].getFileName ? stack[3].getFileName() : "";
    }

    public static mixins(_klass: Function, mixins: Function | Function[]) {

        _.forEach(_.isArray(mixins) ? mixins : [mixins], (mixin) => {
            _(Object.getOwnPropertyNames(mixin.prototype))
                .without("constructor")
                .forEach(name => _klass.prototype[name] = mixin.prototype[name])

        });

    }


}


