const express = require('express')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')
const config = require('./utils/config')
const logger = require('./utils/logger')
const productsRouter = require('./controllers/products')
const userRouter = require('./controllers/user')
const loginRouter = require('./controllers/login')
const categoriesRouter = require('./controllers/categories')
const morgan = require('morgan');
const cors = require('cors')

const app = express()
app.use(cors())

app.use(morgan('combined'));
mongoose.set('strictQuery', false)

mongoose.connect(config.MONGODB_URI)
.then(() => {logger.info('connected to MongoDB')})
.catch((error)=>{logger.info('error connecting to MongoDB: ', error.message)})

app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/products', productsRouter)
app.use('/api/user', userRouter)
app.use('/api/login', loginRouter)
app.use('/api/categories', categoriesRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app