"use strict";
import CallSite = NodeJS.CallSite;

import {Errors,} from '@appolo/utils';

export class Util {


    public static stack(): CallSite[] {

        return Errors.stack();
    }

    public static callerPath(): string {

        let stack = Util.stack();

        return stack[4] && stack[4].getFileName ? stack[4].getFileName() : "";
    }


}


