"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const _ = require("lodash");
const fs = require("fs");
const appolo_inject_1 = require("appolo-inject");
class Util extends appolo_inject_1.Util {
    static loadPathWithArgs(paths, injector) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            for (let path of paths) {
                if (!fs.existsSync(path)) {
                    continue;
                }
                let modulesFunc = require(path);
                if (!_.isFunction(modulesFunc)) {
                    continue;
                }
                let args = Util.getFunctionArgs(modulesFunc);
                let dependencies = _.map(args, (arg) => injector.getObject(arg));
                let result = modulesFunc.apply(modulesFunc, dependencies);
                //check for promise
                if (result && result.then) {
                    yield result;
                }
            }
        });
    }
    static mixins(_klass, mixins) {
        _.forEach(_.isArray(mixins) ? mixins : [mixins], (mixin) => {
            _(Object.getOwnPropertyNames(mixin.prototype))
                .without("constructor")
                .forEach(name => _klass.prototype[name] = mixin.prototype[name]);
        });
    }
}
exports.Util = Util;
//# sourceMappingURL=util.js.map