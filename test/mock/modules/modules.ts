import appolo = require('../../../index');

import logger from './logger';
import logger2 from './logger2';
import logger3 from './logger3';
import logger4 from './logger4';
import logger5 from './logger5';
import logger6 from './logger6';
import logger7 from './logger7';
import {IEnv} from "../../../lib/IEnv";
import {App} from "../../../lib/app";
import {TestModule} from "./testModule";

export = async function (env: IEnv, app: App) {
    await app.module(logger);
    await app.module(logger2({test: 'test2'}));
    await Promise.all([
        app.module(logger3({test: 'test3'})),
        app.module(logger4({test: 'test4'}))]);

    await app.module(logger5({test: 'test5'}));

    await app.module(logger6({test: 'test6'}));
    await app.module(logger7({test: 'test7'}));

    await app.module(TestModule)
}