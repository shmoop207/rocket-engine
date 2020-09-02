"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@appolo/utils");
function default_1(options) {
    return async (env, inject) => {
        let logger6 = {
            getName: function () {
                return env.test + "logger6";
            }
        };
        inject.addObject('logger6', logger6);
        await utils_1.Promises.delay(2);
    };
}
exports.default = default_1;
//# sourceMappingURL=logger6.js.map