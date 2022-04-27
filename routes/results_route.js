const express = require('express')

const router = express.Router()

const tayloredGraph = require('../services/Unlock.js')

const commands = require('./step3_route')

module.exports = (params)=> {

    router.get('/', (req, res)=> {})

    router.post('/', (req, res)=> {
        const RawCheckedCourses = req.body// strings...needs conversion to Node()

        const courseMapper = commands.mapper // courses mapped by string name

        const graph = commands.graph // main graph

        const unlockedCourses = tayloredGraph.nodes(graph, courseMapper, RawCheckedCourses)

        res.render('results', {
            nodeList: unlockedCourses
        })
    })

    return router
}