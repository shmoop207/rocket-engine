import appolo = require('../../../../index');
import {Promises} from '@appolo/utils';
import {Injector}  from '@appolo/inject';


export default function (options?: any) {

    return async (env, inject: Injector): Promise<any> => {

        let logger6 = {
            getName: function () {
                return env.test + "logger6";
            }
        };

        inject.addObject('logger6', logger6);

        await Promises.delay(2)
    }
}





