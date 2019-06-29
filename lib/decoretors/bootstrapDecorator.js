"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BootstrapSymbol = Symbol("__bootstrap__");
function bootstrap() {
    return function (fn) {
        Reflect.defineMetadata(exports.BootstrapSymbol, true, fn);
    };
}
exports.bootstrap = bootstrap;
//# sourceMappingURL=bootstrapDecorator.js.map