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
const baseModuleClassModule_1 = require("./baseClass/baseModuleClassModule");
const testLoadModule_1 = require("./testLoad/testLoadModule");
module.exports = async function (env, app, modules) {
    await modules.loadFn(logger_1.default);
    await modules.loadFn(logger2_1.default({ test: 'test2' }));
    await modules.loadFn(logger3_1.default({ test: 'test3' }), logger4_1.default({ test: 'test4' }));
    await modules.loadFn(logger5_1.default({ test: 'test5' }));
    await modules.loadFn(logger6_1.default({ test: 'test6' }));
    await app.modules.loadFn(logger7_1.default({ test: 'test7' }));
    await app.modules.load(testLoadModule_1.TestLoadModule);
    if (env.testLoadModule) {
        app.modules.use(testModule_1.TestModule).use(validateModule_1.ValidateModule).use(baseModuleClassModule_1.BaseModuleClassModule);
    }
    app.modules.use(delayModule_1.DelayModule.for({ delay: 11, testModule: env.test }), delayModule_1.DelayModule.for({
        delay: 1,
        testModule: env.test,
        id: "delay2"
    }));
    app.modules.use(dbModule_1.DbModule.for({ id: "dbMock" }));
    app.modules.use(nestedModule_1.NestedModule.for({
        delay: 1,
        testModule: env.test,
    }));
};
//# sourceMappingURL=all.js.map