const config = require('./utils/config')
const express = require('express')
require('express-async-errors')

const app = express()
const cors = require('cors')
const blogRouter = require('./controllers/blogs')



app.use(cors())
app.use(express.json())
app.use('api/blogs', blogRouter)


module.exports = app
