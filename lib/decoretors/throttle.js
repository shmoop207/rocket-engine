"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
function throttle(milliseconds = 0, options) {
    return function (target, propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = _.throttle(originalMethod, milliseconds, options);
        return descriptor;
    };
}
exports.throttle = throttle;
//# sourceMappingURL=throttle.js.map