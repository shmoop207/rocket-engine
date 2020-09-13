import {IExported} from "../interfaces/IModule";
import {IApp} from "../interfaces/IApp";
import {App} from "../app";
import {Reflector, Arrays} from "@appolo/utils";
import {Define} from "@appolo/inject";
import {Util} from "@appolo/inject";

export class Discovery {

    protected _app: IApp;
    protected _exported: IExported[];


    constructor(app: IApp) {
        this._app = app;
        this._exported = [];
    }

    public get exported(): IExported[] {
        return this._exported
    }

    public addExported(value: IExported): void {
        this.exported.push(value)
    }

    public get exportedRoot(): IExported[] {
        let parent: IApp = this._app;

        let exported = [];

        while (parent != null) {
            exported.push(...parent.discovery.exported);
            parent = parent.parent;
        }

        return exported;
    }

    public filterByType(type: any): IExported[] {
        return this._exported.filter(item => item.fn === type)
    }

    public findByType(type: any): IExported {
        return this._exported.find(item => item.fn === type)
    }

    public findReflectData<T>(symbol: Symbol | string): IExported & { metaData: T } {

        return Reflector.findReflectData(symbol, this._exported)
    }

    public findAllReflectData<T>(symbol: Symbol | string): (IExported & { metaData: T })[] {

        return Reflector.findAllReflectData(symbol, this._exported)
    }

    public setReflectMetadata(key: string | Symbol, value: any, target: any, propertyKey?: string) {
        return Discovery.setReflectMetadata(key, value, target, propertyKey)
    }

    public static setReflectMetadata(key: string | Symbol, value: any, target: any, propertyKey?: string) {
        return Reflector.setMetadata(key, value, target, propertyKey)
    }

    public getReflectMetadata<T>(symbol: Symbol | string, klass: any, propertyName?: string, defaultValue?: T): T {

        return Discovery.getReflectMetadata(symbol, klass, propertyName, defaultValue)
    }

    public static getReflectMetadata<T>(symbol: Symbol | string, klass: any, propertyName?: string, defaultValue?: T): T {

        return Reflector.getMetadata(symbol, klass, propertyName, defaultValue)
    }

    public decorateReflectMetadata(key: string | Symbol, value: any) {
        return Discovery.decorateReflectMetadata(key, value)
    }

    public static decorateReflectMetadata(key: string | Symbol, value: any) {
        return Reflector.decorateMetadata(key, value)
    }

    public getClassDefinition(fn: any): Define {
        return Discovery.getClassDefinition(fn)
    }

    public static getClassDefinition(fn: any): Define {
        return Util.getClassDefinition(fn)
    }

    public getClassId(fn: any): string {
        return Discovery.getClassId(fn)
    }

    public static getClassId(fn: any): string {
        return Util.getClassId(fn)
    }

    public getClassName(fn: Function): string {
        return Discovery.getClassName(fn)
    }

    public static getClassName(fn: Function): string {
        return Util.getClassName(fn)
    }


    public reset() {
        this._exported = [];
    }
}
