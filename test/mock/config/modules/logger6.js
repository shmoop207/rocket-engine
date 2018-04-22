"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Q = require("bluebird");
function default_1(options) {
    return async (env, inject) => {
        let logger6 = {
            getName: function () {
                return env.test + "logger6";
            }
        };
        inject.addObject('logger6', logger6);
        await Q.delay(2);
    };
}
exports.default = default_1;
//# sourceMappingURL=logger6.js.map