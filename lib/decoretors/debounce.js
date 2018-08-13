"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
function debounce(milliseconds = 0, options) {
    return function (target, propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = _.debounce(originalMethod, milliseconds, options);
        return descriptor;
    };
}
exports.debounce = debounce;
//# sourceMappingURL=debounce.js.map