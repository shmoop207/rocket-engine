import {createApp, IApp, IModuleOptions, IModuleParams} from "../../index"
import {Helpers} from "../util/helpers";
import {initAsync, singleton,bootstrapAsync} from "@appolo/inject";
import {Event} from "@appolo/events";
import {IClass, ModuleTypes} from "./interfaces/IModule";
import milliseconds = require("mocha/lib/ms");

let i=0;
@singleton()
export class Module<T = any> {

    protected _exports: ModuleTypes = [];
    protected _fileExports: IClass[] = [];
    protected _imports: ModuleTypes = [];
    protected _moduleOptions: T;
    protected _app: IApp;

    protected readonly Defaults: Partial<T> = {};

    public get defaults(): Partial<T> {
        return this.Defaults
    }

    public static for(config: {[index:string]:any}, options: IModuleOptions = {}): IModuleParams {
        return {type: this, config, ...options}
    }

    public get app(): IApp {
        return this._app;
    }

    public set app(value: IApp) {
        this._app = value;
    }

    public get parent(): IApp {
        return this._app.tree.parent;
    }

    public get root(): IApp {
        return this._app.tree.root
    }

    public get rootParent(): IApp {

        return this._app.tree.root
    }

    public get exports(): ModuleTypes {
        return this._exports;
    }

    public set exports(value: (IClass | { id: string; type: IClass | string })[]) {
        this._exports = value;
    }

    public get fileExports(): IClass[] {
        return this._fileExports;
    }

    public set fileExports(value: IClass[]) {
        this._fileExports = value;
    }

    public set imports(value: (IClass | { id: string; type: IClass | string })[]) {
        this._imports = value;
    }

    public get imports(): ModuleTypes {
        return this._imports;
    }

    public get moduleOptions(): T {
        return this._moduleOptions;
    }

    public set moduleOptions(value: T) {
        this._moduleOptions = value;
    }

    public beforeAppInitialize():any {

    }

    public beforeModuleInitialize():any {

    }

    public beforeModuleLaunch() {

    }



    @initAsync()
    public onInjectInitialize() {

    }

    @bootstrapAsync()
    public onInjectBootstrap() {

    }



    public afterModuleInitialize() {

    }

    public afterModuleLaunch() {

    }

    public afterAppInitialize():any {

    }

    public afterAppLaunch():any {
    }

    public beforeReset() {

    }

    public reset() {

    }


}
