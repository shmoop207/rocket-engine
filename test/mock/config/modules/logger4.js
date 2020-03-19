"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appolo_utils_1 = require("appolo-utils");
function default_1(options) {
    return async (env, inject, logger2) => {
        let logger4 = {
            getName: function () {
                return logger2.getName() + "logger4";
            }
        };
        inject.addObject('logger4', logger4);
        await appolo_utils_1.Promises.delay(1);
    };
}
exports.default = default_1;
//# sourceMappingURL=logger4.js.map