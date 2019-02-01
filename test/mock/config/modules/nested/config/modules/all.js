"use strict";
const dbModule_1 = require("../../../db/dbModule");
module.exports = async function (env, app) {
    await app.module(new dbModule_1.DbModule({ id: "dbMock2" }));
};
//# sourceMappingURL=all.js.map