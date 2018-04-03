import appolo = require('../../../index');
import    Q = require('bluebird');


export  default function (options?:any) {
    return   async (env, inject:appolo.Injector, logger2)=> {

        let logger3 = {
            getName: function () {
                return logger2.getName()+"logger3";
            }
        };

        inject.addObject('logger3', logger3);

        await Q.delay(1)
    }
}





