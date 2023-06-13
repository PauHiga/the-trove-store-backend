const express = require('express')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')
const config = require('./utils/config')
const logger = require('./utils/logger')
const productsRouter = require('./controllers/products')

const app = express()

mongoose.set('strictQuery', false)

mongoose.connect(config.MONGODB_URI)
.then(() => {logger.info('connected to MongoDB')})
.catch((error)=>{logger.info('error connecting to MongoDB: ', error.message)})

app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/products', productsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app