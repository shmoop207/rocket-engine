import {IApp} from "../interfaces/IApp";
import {Util} from "../util/util";
import {Arrays} from "@appolo/utils";
import {ITree} from "../interfaces/ITree";

export class Tree implements ITree {


    constructor(private _app: IApp) {
    }

    private _root: IApp;
    protected _parent: IApp;
    protected _children: IApp[] = [];

    public getParent<T extends IApp = IApp>(): T {
        return this.parent as T;
    }

    public get parent(): IApp {
        return this._parent;
    }

    public getRoot<T extends IApp = IApp>(): T {
        return this.root as T;
    }

    public get root(): IApp {

        if (this._root) {
            return this._root;
        }

        let parent = this.parent;

        while (parent.tree.parent != null) {
            parent = parent.tree.parent;
        }

        this._root = parent;

        return parent;
    }

    public get children(): IApp[] {
        return this._children;
    }

    public childAt(index: number): IApp {
        return this._children[index];
    }

    public set parent(value: IApp) {

        if (value == null) {
            this._parent && Arrays.remove(this._parent.tree.children, this._app);
            this._parent = null;
            return;
        }

        this._parent = value;
        value.tree.children.push(this._app);

    }
}

