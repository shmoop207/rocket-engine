import {Cache} from "appolo-cache/index";
import {ILogger} from "../interfaces/ILogger";
import _ = require('lodash');
import Timer = NodeJS.Timer;

interface IOptions {
    resolver?: Function,
    maxSize?: number,
    maxAge?: number,
    clone?: boolean,
    getMethod?: "get" | "peek" | "getByExpire" | "peekByExpire"
    logger?: ILogger
    interval?: number

}

interface IInnerOptions extends IOptions {
    isPromise?: boolean
    isExpireCache?: boolean
    timer?: Timer;
}

export function cache(cacheOptions: IOptions = {}) {

    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {

        let options: IInnerOptions = _.defaults({}, cacheOptions, {getMethod: "get", clone: false});

        options.isExpireCache = options.getMethod == "getByExpire" || options.getMethod == "peekByExpire";
        options.isPromise = false;

        const originalMethod = descriptor.value,
            cache = new Cache(options);

        descriptor.value = function (...args) {

            let key = options.resolver ? options.resolver.apply(this, args) : args[0];

            if (options.interval && !options.timer) {
                options.timer = setInterval(() => refreshValue(this, originalMethod, key, args, cache, options), options.interval)
            }

            let item = getValueFromMemory(this, originalMethod, key, args, cache, options);

            if (item) {
                return options.isPromise ? Promise.resolve(item) : item
            }

            let result = getValue(this, originalMethod, args, key, cache, options);

            return result


        };
        return descriptor;
    };

    function getValueFromMemory(scope: any, originalMethod: any, key: any, args: any[], cache: Cache<any, any>, options: IInnerOptions) {

        let result = cache[options.getMethod || "get"](key);

        if (!result) {
            return null;
        }

        let value = result;

        if (options.isExpireCache) {
            value = result.value;

            if (!result.validExpire) {
                refreshValue(scope, originalMethod, args, key, cache, options)
            }
        }

        return options.clone ? JSON.parse(value) : value;

    }

    function refreshValue(scope: any, originalMethod: any, args: any[], key: any, cache: Cache<any, any>, options: IOptions) {
        let value = getValue(scope, originalMethod, args, key, cache, options);

        Promise.resolve(value).catch((e) => {
            if (options.logger) {
                options.logger.error(`failed to refresh ${key}`, {e})
            }
        })
    }

    function getValue(scope: any, originalMethod: any, args: any[], key: any, cache: Cache<any, any>, options: IInnerOptions): Promise<any> | any {

        let result = originalMethod.apply(scope, args);

        if (!result || !result.then || !result.catch) {
            cache.set(key, options.clone ? JSON.stringify(result) : result, options.maxAge);
            return result;
        }

        options.isPromise = true;
        let value = result.then((data) => {
            cache.set(key, options.clone ? JSON.stringify(data) : data, options.maxAge);
            return data
        });

        return value
    }
}
