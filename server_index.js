// dependencies
const CSprerequisites = require('./db/prerequisites.json')

const express = require('express')

const ejs = require('ejs')

const path = require('path')

const routes = require('./routes') // imports method from index.js in the routes folder

const DataManager = require("./services/DataManager")

const dm = new DataManager()

const app = express()

const port = 3000

app.use(express.json())

app.listen(port, () => {console.log(`listening at port: ${port}.`)})

app.set('view engine', 'ejs')

app.set('views', path.join(__dirname, './dynamic_views'))

app.use(express.static(path.join(__dirname, './public')))

app.use('/', routes({CSprerequisites, dm}))