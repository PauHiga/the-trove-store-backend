const express = require('express')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')
const config = require('./utils/config')
const logger = require('./utils/logger')
const productsRouter = require('./controllers/products')
const userRouter = require('./controllers/user')
const loginRouter = require('./controllers/login')
const ordersRouter = require('./controllers/orders')
const categoriesRouter = require('./controllers/categories')
const testingRouter = require('./controllers/testing')
const morgan = require('morgan');
const cors = require('cors')

const app = express()

const corsOption = {
  credentials: true,
  origin: ['https://the-trove-store.netlify.app']
}

app.use(cors(corsOption));

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
app.use('/api/orders', ordersRouter)

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app