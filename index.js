var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
const path = require('path')
var app = express()

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, 'dist')))

const Authorization = require('./post/Authorization')
app.post('/api/authorization', Authorization)

const GetDate = require('./post/GetDate')
app.post('/api/get/date', GetDate)

const SetDate = require('./post/SetDate')
app.post('/api/set/date', SetDate)

app.listen(4300)
