import {IApp} from "./IApp";

export interface ITree {
    getParent<T extends IApp = IApp>(): T

    parent: IApp


    getRoot<T extends IApp = IApp>(): T

    readonly root: IApp

    readonly children: IApp[]

    getChildAt(index: number): IApp

}
