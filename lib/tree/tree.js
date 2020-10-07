"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tree = void 0;
const utils_1 = require("@appolo/utils");
class Tree {
    constructor(_app) {
        this._app = _app;
        this._children = [];
    }
    getParent() {
        return this.parent;
    }
    get parent() {
        return this._parent;
    }
    getRoot() {
        return this.root;
    }
    get root() {
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
    get children() {
        return this._children;
    }
    getChildAt(index) {
        return this._children[index];
    }
    set parent(value) {
        if (value == null) {
            this._parent && utils_1.Arrays.remove(this._parent.tree.children, this._app);
            this._parent = null;
            return;
        }
        this._parent = value;
        value.tree.children.push(this._app);
    }
}
exports.Tree = Tree;
//# sourceMappingURL=tree.js.map