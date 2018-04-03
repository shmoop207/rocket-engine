"use strict";
const tslib_1 = require("tslib");
const logger_1 = require("./logger");
const logger2_1 = require("./logger2");
const logger3_1 = require("./logger3");
const logger4_1 = require("./logger4");
const logger5_1 = require("./logger5");
const logger6_1 = require("./logger6");
const logger7_1 = require("./logger7");
const testModule_1 = require("./testModule");
module.exports = function (env, app) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        yield app.module(logger_1.default);
        yield app.module(logger2_1.default({ test: 'test2' }));
        yield Promise.all([
            app.module(logger3_1.default({ test: 'test3' })),
            app.module(logger4_1.default({ test: 'test4' }))
        ]);
        yield app.module(logger5_1.default({ test: 'test5' }));
        yield app.module(logger6_1.default({ test: 'test6' }));
        yield app.module(logger7_1.default({ test: 'test7' }));
        yield app.module(testModule_1.TestModule);
    });
};
//# sourceMappingURL=modules.js.map