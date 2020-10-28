import {IApp} from "../app/IApp";

export interface ITree {
    getParent<T extends IApp = IApp>(): T

    parent: IApp


    getRoot<T extends IApp = IApp>(): T

    readonly root: IApp

    readonly children: IApp[]

    childAt(index: number): IApp

}
