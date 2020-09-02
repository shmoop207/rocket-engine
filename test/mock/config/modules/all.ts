import logger from './logger';
import logger2 from './logger2';
import logger3 from './logger3';
import logger4 from './logger4';
import logger5 from './logger5';
import logger6 from './logger6';
import logger7 from './logger7';
import {TestModule} from './test/testModule';
import {IEnv} from "../../../../lib/interfaces/IEnv";
import {App} from "../../../../lib/app";
import {DelayModule} from "./delay/delayModule";
import {DbModule} from "./db/dbModule";
import {NestedModule} from "./nested/nestedModule";
import {ValidateModule} from "./validate/validateModule";
import {BaseModuleClassModule} from "./baseClass/baseModuleClassModule";

export = async function (env: IEnv, app: App) {
    await app.module(logger);
    await app.module(logger2({test: 'test2'}));
    await app.module(logger3({test: 'test3'}), logger4({test: 'test4'}));

    await app.module(logger5({test: 'test5'}));

    await app.module(logger6({test: 'test6'}));
    await app.module(logger7({test: 'test7'}));

    await app.module(TestModule);
    await app.module(ValidateModule);
    await app.module(BaseModuleClassModule);
    await app.module(
        DelayModule.for({delay: 11, testModule: env.test}),
        DelayModule.for({
            delay: 1,
            testModule: env.test,
            id: "delay2"
        }));
    await app.module(DbModule.for({id: "dbMock"}));

    await app.module(NestedModule.for({
        delay: 1,
        testModule: env.test,
    }));
}
