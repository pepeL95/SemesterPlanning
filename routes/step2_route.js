const express = require('express')

const router = express.Router()

module.exports = (params) => {
    router.get('/', (req, res)=> {
        res.render('step2')
    })

    router.post('/', (params)=> {

    })

    return router
}