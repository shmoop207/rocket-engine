import appolo = require('../../../../index');
import {Promises} from 'appolo-utils';


export default function (options?: any) {

    return async (env, inject: appolo.Injector): Promise<any> => {

        let logger6 = {
            getName: function () {
                return env.test + "logger6";
            }
        };

        inject.addObject('logger6', logger6);

        await Promises.delay(2)
    }
}





