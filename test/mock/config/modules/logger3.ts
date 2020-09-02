import appolo = require('../../../../index');
import {Promises} from '@appolo/utils';
import {Injector}  from '@appolo/inject';


export  default function (options?:any) {
    return   async (env, inject:Injector, logger2)=> {

        let logger3 = {
            getName: function () {
                return logger2.getName()+"logger3";
            }
        };

        inject.addObject('logger3', logger3);

        await Promises.delay(1)
    }
}





