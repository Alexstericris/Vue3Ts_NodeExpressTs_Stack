const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

var Post = require("../models/posts");

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors({origin: 'http://alexcristea.sytes.net:8080'}))

const registerApiRoutes = require("../routes/api");

// Routes Setup

registerApiRoutes(app)

app.listen(process.env.PORT || 8081)
