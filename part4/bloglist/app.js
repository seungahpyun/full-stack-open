const config = require('./utils/config')
const express = require('express')
require('express-async-errors')

const app = express()
const cors = require('cors')
const blogRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require("./utils/middleware")

app.use(cors())
app.use(express.json())

app.use(middleware.errorHandler)
app.use(middleware.tokenExtractor)
app.use('/api/users', usersRouter)
app.use('/api/blogs', middleware.userExtractor, blogRouter)
app.use('/api/login', loginRouter)

app.use(middleware.errorHandler)


module.exports = app
