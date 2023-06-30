const categoriesRouter = require('express').Router()
const Category = require('../models/categoriesModel')
require('express-async-errors')
const jwt = require('jsonwebtoken')
  
const getTokenFrom = request => {
  const authorization = request.get('Authorization')
  if (authorization && authorization.startsWith('Bearer ')){
    return authorization.replace('Bearer ', '')
  }
  return null
}

categoriesRouter.get('/', async (request, response)=>{
  const categories = await Category.find({})
  response.json(categories)
})

categoriesRouter.post('/', async (request, response) => {
  const body = request.body
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if (!decodedToken.id){
    return response.status(401).json({ error: 'token invalid'})
  }
  if (decodedToken.role != 1){
    return response.status(401).json({ error: 'only admin users can modify this'})
  }
  const category = new Category({
      category: body.category,
    })
    const savedCategory = await category.save()
    response.json(savedCategory)
})

categoriesRouter.put('/:id', async (request, response) => {
  const body = request.body
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if (!decodedToken.id){
    return response.status(401).json({ error: 'token invalid'})
  }
  if (decodedToken.role != 1){
    return response.status(401).json({ error: 'only admin users can modify this'})
  }
  const category = {
    category: body.category,
  }
    const updatedCategory = await Category.findByIdAndUpdate(request.params.id, category, { new: true, runValidators: true, context: 'query' })
    response.json(updatedCategory)
})

module.exports = categoriesRouter