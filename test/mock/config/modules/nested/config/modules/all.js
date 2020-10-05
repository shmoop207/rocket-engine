"use strict";
const dbModule_1 = require("../../../db/dbModule");
module.exports = async function (env, app) {
    app.modules.use(dbModule_1.DbModule.for({ id: "dbMock2" }));
};
//# sourceMappingURL=all.js.map