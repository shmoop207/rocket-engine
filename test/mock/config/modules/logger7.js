"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appolo_utils_1 = require("appolo-utils");
function default_1(options) {
    return async (env, inject, logger6) => {
        let logger7 = {
            getName: function () {
                return env.test + logger6.getName() + "logger7";
            }
        };
        inject.addObject('logger7', logger7);
        await appolo_utils_1.Promises.delay(2);
    };
}
exports.default = default_1;
//# sourceMappingURL=logger7.js.map