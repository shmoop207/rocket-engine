"use strict";
const validateModule_1 = require("../../../validate/validateModule");
module.exports = async function (env, app) {
    await app.modules.use(validateModule_1.ValidateModule);
};
//# sourceMappingURL=all.js.map