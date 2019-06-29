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
const dbModule_1 = require("./db/dbModule");
const nestedModule_1 = require("./nested/nestedModule");
const validateModule_1 = require("./validate/validateModule");
module.exports = async function (env, app) {
    await app.module(logger_1.default);
    await app.module(logger2_1.default({ test: 'test2' }));
    await app.module(logger3_1.default({ test: 'test3' }), logger4_1.default({ test: 'test4' }));
    await app.module(logger5_1.default({ test: 'test5' }));
    await app.module(logger6_1.default({ test: 'test6' }));
    await app.module(logger7_1.default({ test: 'test7' }));
    await app.module(testModule_1.TestModule);
    await app.module(validateModule_1.ValidateModule);
    await app.module(new delayModule_1.DelayModule({ delay: 10, testModule: env.test }), new delayModule_1.DelayModule({
        delay: 1,
        testModule: env.test,
        id: "delay2"
    }));
    await app.module(new dbModule_1.DbModule({ id: "dbMock" }));
    await app.module(new nestedModule_1.NestedModule({
        delay: 1,
        testModule: env.test,
    }));
};
//# sourceMappingURL=all.js.map