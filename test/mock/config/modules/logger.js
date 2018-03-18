"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Q = require("bluebird");
function default_1(env, inject) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        let logger = {
            getName: function () {
                return env.test;
            }
        };
        inject.addObject('logger', logger);
        yield Q.delay(100);
    });
}
exports.default = default_1;
//# sourceMappingURL=logger.js.map