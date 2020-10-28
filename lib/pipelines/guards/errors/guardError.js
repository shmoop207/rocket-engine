"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuardError = void 0;
class GuardError extends Error {
    constructor(message) {
        super(message || "Forbidden resource");
        this.__GuardError__ = true;
        Object.setPrototypeOf(this, GuardError.prototype);
    }
}
exports.GuardError = GuardError;
//# sourceMappingURL=guardError.js.map