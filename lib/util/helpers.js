"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Helpers = void 0;
const utils_1 = require("@appolo/utils");
class Helpers {
    static stack() {
        return utils_1.Errors.stack();
    }
    static callerPath() {
        let stack = Helpers.stack();
        return stack[4] && stack[4].getFileName ? stack[4].getFileName() : "";
    }
}
exports.Helpers = Helpers;
//# sourceMappingURL=helpers.js.map