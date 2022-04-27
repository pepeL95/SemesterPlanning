const Graph = require("./Graph")
const Nodes = require("./Nodes")
const Edges = require("./Edges")

function strListToNode(map, strList) {
    // accepts string passed from client side and converts it into custom Node class using a courseMapper for better optimization
    // returns a Node array
    var nodeList = []
    for (var s of strList)
        if (map.has(s)) 
            nodeList.push(map.get(s))
    return nodeList
}

function checkNodes(G, alreadyTaken) {
    if (alreadyTaken.length != 0)
        for (var node of alreadyTaken) { // will update the isChecked attribute of the Graph class
            if (!G.edges.has(node)) continue
            const key = node
            //console.log(node)
            node.isChecked = true
            //console.log(node)
            const newKey = node
            G.edges.set(newKey, G.edges.get(key))
            G.edges.delete(key)  
        }
    return G
}

function makeStartList(G) { //O(n)
    // place leaf nodes
    startList = []
    const nodeList = G.getNodes()
    //console.log(nodeList)
    for (var node of nodeList)
        if (G.isLeaf(node))
            startList.push(node)   
    return startList
}

function getUnlocked(updatedGraph) {
    const startStack = makeStartList(updatedGraph)
    var unlocked = []
    while (startStack.length > 0) {
        var startNode = startStack.pop()
        // was it taken? if so continue, otherwise go to next question
        if (startNode.isChecked) continue
        // can we take it? if so take it, otherwise push all the necessary prerequisites and keep checking
        var count = 0
        for (var node of updatedGraph.edges.get(startNode))
            if (!node.isChecked) // if it hasn't been taken
                startStack.push(node) // put it at the front of the startList
            else count++
        if (count == updatedGraph.edges.get(startNode).length && !unlocked.includes(startNode)) // if all prerequisite are met and it is not already in the list, add it
            unlocked.push(startNode) // add it to the unlocked courses list
    }
    return unlocked
}

module.exports.nodes = function(G, map, takenCourses) {
    // Accepts a graph, a courseMapper, and a string array with the already checked courses
    // Returns an Node array with the unlocked courses
    const alreadyTaken = strListToNode(map, takenCourses)
    
    //console.log('already taken: ', alreadyTaken)

    const updatedGraph = checkNodes(G, alreadyTaken)

    //console.log(updatedGraph.edges)

    const unlocked = getUnlocked(updatedGraph)
    
    return unlocked
}