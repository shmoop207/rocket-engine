import {IExported} from "../interfaces/IModule";
import {IApp} from "../interfaces/IApp";
import {App} from "../app";
import {Reflector, Arrays} from "@appolo/utils";
import {Define} from "@appolo/inject";
import {Util} from "@appolo/inject";
import {InjectDefineSymbol} from "@appolo/inject/index";

export class Discovery {

    protected _app: IApp;
    protected _exported: IExported[];


    constructor(app: IApp) {
        this._app = app;
        this._exported = [];
    }

    public getRoot<T extends Discovery = Discovery>(): T {
        return this._app.tree.getRoot().discovery as T
    }

    public getParent<T extends Discovery = Discovery>(): T {
        return this._app.tree.getParent().discovery as T
    }

    public get exported(): IExported[] {
        return this._exported
    }

    public add(value: IExported): void {
        this.exported.push(value)
    }

    public filterByType(type: any): IExported[] {
        return this._exported.filter(item => item.fn === type)
    }

    public findByType(type: any): IExported {
        return this._exported.find(item => item.fn === type)
    }

    public findReflectData<T>(symbol: Symbol | string): IExported & { metaData: T } {

        let item = Reflector.findReflectData<T,IExported>(symbol, this._exported)

        if (item && item.define && this._app.injector.hasInstance(item.define.id)) {
            item.instance = this._app.injector.getInstance(item.define.id);
        }

        return item;
    }

    public findAllReflectData<T>(symbol: Symbol | string): (IExported & { metaData: T })[] {

        let items =  Reflector.findAllReflectData<T,IExported>(symbol, this._exported);

        items.forEach(item=>{
            if (item.define && this._app.injector.hasInstance(item.define.id)) {
                item.instance = this._app.injector.getInstance(item.define.id);
            }
        });

        return items;
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

    public hasClassDefinition(fn: any): boolean {
        return Discovery.hasClassDefinition(fn)
    }

    public static hasClassDefinition(fn: any): boolean {
        return Reflect.hasMetadata(InjectDefineSymbol, fn)
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
