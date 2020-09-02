
import appolo = require('../../../../index');
import {Promises} from '@appolo/utils';
import {Injector}  from '@appolo/inject';


export  default function (options?:any) {
    return   async (env, inject:Injector, logger2)=> {

        let logger4 = {
            getName: function () {
                return logger2.getName()+"logger4";
            }
        };

        inject.addObject('logger4', logger4);

       await Promises.delay(1)
    }
}





