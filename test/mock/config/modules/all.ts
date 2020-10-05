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
import {TestLoadModule} from "./testLoad/testLoadModule";
import {Modules} from "../../../../lib/modules/modules";

export = async function (env: IEnv, app: App,modules:Modules) {
    await modules.loadFn(logger);
    await modules.loadFn(logger2({test: 'test2'}));
    await modules.loadFn(logger3({test: 'test3'}), logger4({test: 'test4'}));
    await modules.loadFn(logger5({test: 'test5'}));
    await modules.loadFn(logger6({test: 'test6'}));
    await app.modules.loadFn(logger7({test: 'test7'}));

    await app.modules.load(TestLoadModule);

    if(env.testLoadModule){
        app.modules.use(TestModule).use(ValidateModule).use(BaseModuleClassModule);

    }

    app.modules.use(
        DelayModule.for({delay: 11, testModule: env.test}),
        DelayModule.for({
            delay: 1,
            testModule: env.test,
            id: "delay2"
        }));


    app.modules.use(DbModule.for({id: "dbMock"}));

    app.modules.use(NestedModule.for({
        delay: 1,
        testModule: env.test,
    }));
}
