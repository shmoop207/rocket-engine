import {IApp} from "../interfaces/IApp";

export class Tree {


    constructor(private _app:IApp) {
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

    public getChildAt(index: number): IApp {
        return this._children[index];
    }

    public set parent(value: IApp) {
        this._parent = value;
        value.tree.children.push(this._app);

    }
}
