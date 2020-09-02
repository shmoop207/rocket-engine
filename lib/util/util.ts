"use strict";

import fs = require('fs');
import CallSite = NodeJS.CallSite;
import {Injector, Util as InjectUtil} from "@appolo/inject";
import {ILogger} from "../interfaces/ILogger";
import {Promises, Errors, Objects, Classes, Reflector, Functions} from '@appolo/utils';
import {IExported} from "../interfaces/IModule";
export class Util extends InjectUtil {

    public static async loadPathWithArgs(paths: string[], injector: Injector) {

        for (let path of paths) {
            if (!fs.existsSync(path)) {
                continue;
            }
            let modulesFunc = require(path);

            if (!Classes.isFunction(modulesFunc)) {
                continue;
            }
            let args = Util.getFunctionArgs(modulesFunc as any);

            let dependencies = args.map(arg => injector.getObject(arg));

            let result = modulesFunc.apply(modulesFunc, dependencies);

            //check for promise
            if (result && result.then) {
                await result;
            }
        }

    }


    public static stack(): CallSite[] {

        return Errors.stack();
    }

    public static callerPath(): string {

        let stack = Util.stack();

        return stack[4] && stack[4].getFileName ? stack[4].getFileName() : "";
    }


    public static logger(injector: Injector): ILogger {

        if (injector.getDefinition("logger")) {
            let logger = injector.get<ILogger>("logger");

            return logger.info && logger.error ? logger : console
        }

        return console
    }
    


}


