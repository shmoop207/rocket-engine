import {IExported} from "./IModule";
import {Define} from "@appolo/inject/index";
import {Discovery} from "../discovery/discovery";

export interface IDiscovery extends Discovery {
    getRoot<T extends Discovery = Discovery>(): T

    getParent<T extends Discovery = Discovery>(): T

    readonly exported: IExported[]

    add(value: IExported): void

    filterByType(type: any): IExported[]

    findByType(type: any): IExported

    findReflectData<T>(symbol: Symbol | string): IExported & { metaData: T }

    findAllReflectData<T>(symbol: Symbol | string): (IExported & { metaData: T })[]

    setReflectMetadata(key: string | Symbol, value: any, target: any, propertyKey?: string)


    getReflectMetadata<T>(symbol: Symbol | string, klass: any, propertyName?: string, defaultValue?: T): T


    decorateReflectMetadata(key: string | Symbol, value: any)


    getClassDefinition(fn: any): Define


    hasClassDefinition(fn: any): boolean


    getClassId(fn: any): string


    getClassName(fn: Function): string

    reset()
}
