"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Q = require("bluebird");
function default_1(options) {
    return (env, inject, logger2) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        let logger4 = {
            getName: function () {
                return logger2.getName() + "logger4";
            }
        };
        inject.addObject('logger4', logger4);
        yield Q.delay(1);
    });
}
exports.default = default_1;
//# sourceMappingURL=logger4.js.map