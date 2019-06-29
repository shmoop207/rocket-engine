import {IExported} from "../interfaces/IModuleDefinition";
import _ = require('lodash');

export class ReflectUtils {
    public static findReflectData<T>(symbol: Symbol | string, exported: IExported[]): IExported & { metaData: T } {

        for (let i = 0, len = (exported ? exported.length : 0); i < len; i++) {
            let result = Reflect.getOwnMetadata(symbol, exported[i].fn);

            if (result !== undefined) {
                return {...exported[i], metaData: result}
            }
        }

        return null;
    }

    public static findAllReflectData<T>(symbol: Symbol | string, exported: IExported[]): (IExported & { metaData: T })[] {

        let results = [];

        for (let i = 0, len = (exported ? exported.length : 0); i < len; i++) {
            let result = Reflect.getOwnMetadata(symbol, exported[i].fn);

            if (result !== undefined) {
                results.push({...exported[i], metaData: result})
            }
        }

        return results;
    }

    public static setReflectMetadata(key: string | Symbol, value: any, target: any, propertyKey?: string) {
        if (propertyKey) {
            Reflect.defineMetadata(key, value, target.constructor, propertyKey)
        } else {
            Reflect.defineMetadata(key, value, target.constructor)

        }
    }

    public static getReflectMetadata<T>(symbol: Symbol | string, klass: any, propertyName?: string, defaultValue?: T): T {

        let value = Reflect.getOwnMetadata(symbol, klass, propertyName);

        if (!value && Reflect.hasMetadata(symbol, klass, propertyName)) {
            value = _.cloneDeep(Reflect.getMetadata(symbol, klass, propertyName));
            Reflect.defineMetadata(symbol, value, klass, propertyName);
        }

        if (!value && defaultValue != undefined) {
            value = defaultValue;
            Reflect.defineMetadata(symbol, value, klass, propertyName);
        }

        return value
    }

    public static decorateReflectMetadata(key: string | Symbol, value: any) {
        return function (target: any, propertyKey: string) {
            ReflectUtils.setReflectMetadata(key, value, target, propertyKey);
        }
    }
}
