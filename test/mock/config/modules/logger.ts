import appolo = require('../../../../index');
import {Promises} from '@appolo/utils';


export default async function (env,inject) {

    let logger =  {
        getName:function(){
            return env.test;
        }
    }

    inject.addObject('logger',logger);

    await  Promises.delay( 1)

}
