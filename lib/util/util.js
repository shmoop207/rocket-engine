"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Util = void 0;
const utils_1 = require("@appolo/utils");
class Util {
    static stack() {
        return utils_1.Errors.stack();
    }
    static callerPath() {
        let stack = Util.stack();
        return stack[4] && stack[4].getFileName ? stack[4].getFileName() : "";
    }
}
exports.Util = Util;
//# sourceMappingURL=util.js.map