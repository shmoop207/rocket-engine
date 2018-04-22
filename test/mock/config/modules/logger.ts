import appolo = require('../../../../index');
import    Q = require('bluebird');


export default async function (env,inject) {

    let logger =  {
        getName:function(){
            return env.test;
        }
    }

    inject.addObject('logger',logger);

    await  Q.delay( 100)

}