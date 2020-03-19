import appolo = require('../../../../index');
import {Promises} from 'appolo-utils';


export default function (options?: any) {

    return async (env, inject: appolo.Injector,logger6): Promise<any> => {

        let logger7 = {
            getName: function () {
                return env.test + logger6.getName()+ "logger7";
            }
        };

        inject.addObject('logger7', logger7);

        await Promises.delay(2)
    }
}





