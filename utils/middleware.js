const logger = require('./logger')

const requestLogger = (request, response, next)=>{
  logger.info('Method:', request.method)
  logger.info('Path:', request.path)
  logger.info('Body:', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
  }

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)
  if (error._message === "User validation failed") {
    response.status(409).json({ error: "There is another user with this name already!" })
  } 
  if (error.name === 'CastError') {
    response.status(404).json({ error: 'Product not found' })
  } 
  if (error.name === 'ValidationError') {
    response.status(404).json({ error: error.message})
  } 
  next(error)
}

module.exports = {
  requestLogger, unknownEndpoint, errorHandler
}