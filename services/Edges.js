module.exports = class Edge {
    constructor(parent, child) {
        this.parent = parent
        this.child = child
    }
    //getters
    getParent() {return this.parent}
    getChild() {return this.child}
}