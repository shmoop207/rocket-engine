"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("../util/util");
function mixins(mixins) {
    return function (fn) {
        util_1.Util.mixins(fn, mixins);
    };
}
exports.mixins = mixins;
//# sourceMappingURL=mixins.js.map