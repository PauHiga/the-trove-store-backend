const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const ordersRouter = require('express').Router()
const Order = require('../models/ordersModel')

const getTokenFrom = request => {
  const authorization = request.get('Authorization')
  if (authorization && authorization.startsWith('Bearer ')){
    return authorization.replace('Bearer ', '')
  }
  return null
}

ordersRouter.get('/', async (request, response)=>{
  const orders = await Order.find({}).populate('user')
  response.json(orders)
})

ordersRouter.post('/', async (request, response) => {
  const body = request.body

  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if (!decodedToken.id){
    return response.status(401).json({ error: 'token invalid'})
  }

  const newOrder = new Order({
    user: decodedToken.id,
    products: body.products,
    completed: body.completed
  })

  const savedOrder = await newOrder.save()
  response.json({savedOrder})
})

ordersRouter.put('/:id', async (request, response) => {
  const body = request.body

  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if (!decodedToken.id){
    return response.status(401).json({ error: 'token invalid'})
  }
 
  const successfullyUpdatedOrder = await Order.findByIdAndUpdate(request.params.id, body, { new: true, runValidators: true, context: 'query' })
  response.json(successfullyUpdatedOrder)
})

module.exports = ordersRouter
