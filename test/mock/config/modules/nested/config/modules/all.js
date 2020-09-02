"use strict";
const dbModule_1 = require("../../../db/dbModule");
module.exports = async function (env, app) {
    await app.module(dbModule_1.DbModule.for({ id: "dbMock2" }));
};
//# sourceMappingURL=all.js.map