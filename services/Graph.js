const Edge = require('./Edges')

module.exports = class Graph {
    constructor() {
        this.edges = new Map()
        this.size = 0
    }

    //methods
    len() {return this.size} // returns size of the graph

    addCourse(course) {
        this.edges.set(course, [])
        this.size += 1
    }

    addEdge(edge) { // adds prerequisite to an existing class
        const parent = edge.getParent()
        const child = edge.getChild()
        //console.log(parent, child)
        if (!(this.edges.has(parent) && this.edges.has(child))) return       
        
        this.edges.get(parent).push(child)
    }

    getNodes() {
        var nodeList = []
        for (var node of this.edges)
            nodeList.push(node[0])
        
        return nodeList
    }

    isLeaf(node) {
        for (var pair of this.edges)
            if (pair[1].includes(node)) // if node is a prerequisite
                return false
        return true
    }
    getPrereq(node) {
        return this.edges.get(node)
    }
}