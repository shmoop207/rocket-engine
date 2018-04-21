"use strict";
const logger_1 = require("./logger");
const logger2_1 = require("./logger2");
const logger3_1 = require("./logger3");
const logger4_1 = require("./logger4");
const logger5_1 = require("./logger5");
const logger6_1 = require("./logger6");
const logger7_1 = require("./logger7");
const testModule_1 = require("./test/testModule");
const delayModule_1 = require("./delay/delayModule");
module.exports = async function (env, app) {
    await app.module(logger_1.default);
    await app.module(logger2_1.default({ test: 'test2' }));
    await Promise.all([
        app.module(logger3_1.default({ test: 'test3' })),
        app.module(logger4_1.default({ test: 'test4' }))
    ]);
    await app.module(logger5_1.default({ test: 'test5' }));
    await app.module(logger6_1.default({ test: 'test6' }));
    await app.module(logger7_1.default({ test: 'test7' }));
    await app.module(testModule_1.TestModule);
    await app.module(new delayModule_1.DelayModule({ delay: 1 }));
};
//# sourceMappingURL=modules.js.map