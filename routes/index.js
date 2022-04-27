const express = require('express')

const router = express.Router()

const step1_route = require('./step1_route')

const step2_route = require('./step2_route')

const step3_route = require('./step3_route')

const results_route = require('./results_route')

module.exports = (params) => {
    router.get('/', (req, res)=> {
        res.render('index')
    })

    router.post('/', (req, res)=> {

    })

    router.use('/step1', step1_route(params))
    
    router.use('/step2', step2_route(params))

    router.use('/step3', step3_route(params))

    router.use('/results', results_route(params))

    return router
}

