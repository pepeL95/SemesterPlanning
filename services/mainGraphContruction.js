const Node = require('./Nodes')

const Edge = require('./Edges')

const Graph = require('./Graph')

const prerequisites = {
    'ENC1102': ['ENC1101'],
    'MAC2312': ['MAC2311'],
    'PHY2048': ['MAC2311'],
    'COP2510': ['MAC2311'],
    'COT3100': ['MAC2311'],
    'PHY2049': ['PHY2048', 'MAC 2312'],
    'MAC2313': ['MAC2312'],
    'COP3514': ['COP2510'],
    'CDA3103': ['PHY2048', 'COP2510'],
    'EGN4450': ['MAC2312'],
    'EGN3443': ['MAC2312'],
    'CDA3201': ['CDA3103', 'COP3514'],
    'CDA3201L': ['CDA3103', 'COP3514'],
    'COP4530': ['CDA3103', 'COP3514', 'COT3100'],
    'CDA4205': ['CDA3201'],
    'CDA4205L': ['CDA3201'],
    'COT4400': ['COP4530'],
    'COP4600': ['COP4530'],
    'CNT4419': ['COP4530'],
    'CIS4250': ['COP4600'],
    'CEN4020': ['COP4530']
} // manually inputted and updated

module.exports = class mainGraphConstructor {
    constructor(lookUpTable) {
        this.graph = new Graph()
        this.courseMapper = new Map()
        this.lookUpTable = lookUpTable
    }
    addToMapper(key, val) { this.courseMapper.set(key, val) }

    makeEdges() {
        for (var parentCourse of this.courseMapper)
            if (this.lookUpTable[parentCourse[0]] != undefined)
                for (var prereq of this.lookUpTable[parentCourse[0]])
                    this.graph.addEdge(new Edge(this.courseMapper.get(parentCourse[0]), this.courseMapper.get(prereq)))
    }

    appendEdges(listOfEdges) { for (edge of listOfEdges) this.graph.addEdge(edge) }

    getGraph() { return this.graph }

    getMapper() { return this.courseMapper }

    getLookUpTable() { return this.lookUpTable }

    resetGraph() {this.graph = new Graph()}
}