
import appolo = require('../../../index');
import    Q = require('bluebird');


export  default function (options?:any) {
    return   async (env, inject:appolo.Injector, logger2)=> {

        let logger4 = {
            getName: function () {
                return logger2.getName()+"logger4";
            }
        };

        inject.addObject('logger4', logger4);

       await Q.delay(1)
    }
}





