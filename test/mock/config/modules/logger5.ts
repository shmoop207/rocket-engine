
import appolo = require('../../../../index');
import {Promises} from 'appolo-utils';


export  default function (options?:any) {
    return   async (env, inject:appolo.Injector, logger3,logger4):Promise<any>=> {

        let logger5 = {
            getName: function () {
                return logger4.getName()+"logger5";
            }
        };

        inject.addObject('logger5', logger5);

        await Promises.delay(1)
    }
}





