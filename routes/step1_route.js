const express = require('express')

const router = express.Router()

module.exports = (params) => {
    router.get('/', (req, res)=> {
        res.render('step1')
    })

    router.post('/', (req, res) => {

    })

    return router
}