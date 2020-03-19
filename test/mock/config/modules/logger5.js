"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appolo_utils_1 = require("appolo-utils");
function default_1(options) {
    return async (env, inject, logger3, logger4) => {
        let logger5 = {
            getName: function () {
                return logger4.getName() + "logger5";
            }
        };
        inject.addObject('logger5', logger5);
        await appolo_utils_1.Promises.delay(1);
    };
}
exports.default = default_1;
//# sourceMappingURL=logger5.js.map