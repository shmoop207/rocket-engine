"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appolo_utils_1 = require("appolo-utils");
function default_1(options) {
    return async (env, inject, logger2) => {
        let logger3 = {
            getName: function () {
                return logger2.getName() + "logger3";
            }
        };
        inject.addObject('logger3', logger3);
        await appolo_utils_1.Promises.delay(1);
    };
}
exports.default = default_1;
//# sourceMappingURL=logger3.js.map