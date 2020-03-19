"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appolo_utils_1 = require("appolo-utils");
async function default_1(env, inject) {
    let logger = {
        getName: function () {
            return env.test;
        }
    };
    inject.addObject('logger', logger);
    await appolo_utils_1.Promises.delay(100);
}
exports.default = default_1;
//# sourceMappingURL=logger.js.map