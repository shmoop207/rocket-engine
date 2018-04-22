"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Q = require("bluebird");
async function default_1(env, inject) {
    let logger = {
        getName: function () {
            return env.test;
        }
    };
    inject.addObject('logger', logger);
    await Q.delay(100);
}
exports.default = default_1;
//# sourceMappingURL=logger.js.map