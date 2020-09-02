"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = exports.pipelineType = exports.pipelineInstance = exports.pipeline = exports.after = exports.before = exports.module = exports.bootstrap = exports.PipelineContext = exports.Events = exports.Module = exports.App = exports.FilesLoader = exports.Discovery = exports.Launcher = exports.Util = void 0;
const app_1 = require("./lib/app");
var util_1 = require("./lib/util/util");
Object.defineProperty(exports, "Util", { enumerable: true, get: function () { return util_1.Util; } });
var launcher_1 = require("./lib/launcher/launcher");
Object.defineProperty(exports, "Launcher", { enumerable: true, get: function () { return launcher_1.Launcher; } });
var discovery_1 = require("./lib/launcher/discovery");
Object.defineProperty(exports, "Discovery", { enumerable: true, get: function () { return discovery_1.Discovery; } });
var filesLoader_1 = require("./lib/loader/filesLoader");
Object.defineProperty(exports, "FilesLoader", { enumerable: true, get: function () { return filesLoader_1.FilesLoader; } });
var app_2 = require("./lib/app");
Object.defineProperty(exports, "App", { enumerable: true, get: function () { return app_2.App; } });
var module_1 = require("./lib/modules/module");
Object.defineProperty(exports, "Module", { enumerable: true, get: function () { return module_1.Module; } });
var events_1 = require("./lib/interfaces/events");
Object.defineProperty(exports, "Events", { enumerable: true, get: function () { return events_1.Events; } });
var pipelineContext_1 = require("./lib/pipelines/pipelineContext");
Object.defineProperty(exports, "PipelineContext", { enumerable: true, get: function () { return pipelineContext_1.PipelineContext; } });
var decorators_1 = require("./lib/decoretors/decorators");
Object.defineProperty(exports, "bootstrap", { enumerable: true, get: function () { return decorators_1.bootstrap; } });
Object.defineProperty(exports, "module", { enumerable: true, get: function () { return decorators_1.module; } });
Object.defineProperty(exports, "before", { enumerable: true, get: function () { return decorators_1.before; } });
Object.defineProperty(exports, "after", { enumerable: true, get: function () { return decorators_1.after; } });
Object.defineProperty(exports, "pipeline", { enumerable: true, get: function () { return decorators_1.pipeline; } });
Object.defineProperty(exports, "pipelineInstance", { enumerable: true, get: function () { return decorators_1.pipelineInstance; } });
Object.defineProperty(exports, "pipelineType", { enumerable: true, get: function () { return decorators_1.pipelineType; } });
exports.createApp = function (options) {
    return new app_1.App(options);
};
//# sourceMappingURL=index.js.map