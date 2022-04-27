const express = require('express')

const router = express.Router()

const Node = require('../services/Nodes')

const mainGraphConstructor = require('../services/mainGraphContruction.js')

module.exports = (params)=> {
    const {CSprerequisites, dm} = params

    // const {dm} = params

    const commands = new mainGraphConstructor(CSprerequisites) // global variable, available to all routes

    router.get('/', (req, res)=> {
        commands.resetGraph() // when refreshing, provide a new graph

        dm.readData('./db/tempCourses.csv')
        .on('error', error => {console.error(error)})
        .on('data', row => {
            if (row['Dept.'] == '1') {
                commands.addToMapper(`${row.Prefix}${row.Number}`, new Node(row.Prefix, row.Number, row.Title, false, false, false))
                commands.getGraph().addCourse(commands.getMapper().get(`${row.Prefix}${row.Number}`))
            }
        }).on('end', ()=> {
            commands.makeEdges() // it makes and adds edges to th graph
            module.exports.mapper = commands.getMapper() // export the course map for use on other routes
            module.exports.graph = commands.getGraph() // export the graph for use on other routes
            res.render('step3', {nodeList: commands.getGraph().getNodes()}) // render the html/css contents
        })
    })

    router.post('/', (req, res) => {})    
    return router
}
