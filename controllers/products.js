const productsRouter = require('express').Router()
const Category = require('../models/categoriesModel')
const Product = require('../models/productsModel')
const Admin = require('../models/userModel')
require('express-async-errors')
const jwt = require('jsonwebtoken')
const fs = require('fs')
  
const getTokenFrom = request => {
  const authorization = request.get('Authorization')
  if (authorization && authorization.startsWith('Bearer ')){
    return authorization.replace('Bearer ', '')
  }
  return null
}

productsRouter.get('/', async (request, response)=>{
  const products = await Product.find({}).populate('category', {category: 1})
  response.json(products)
})

productsRouter.get('/:id', async (request, response) => {
  const product = await Product.findById(request.params.id)
    if (product) {
        response.json(product);
      } 
    else {
        response.status(404).json({ error: 'Product not found' });
      }
})

productsRouter.post('/', async (request, response) => {  
  const body = request.body
  console.log(request.body)
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if (!decodedToken.id){
    return response.status(401).json({ error: 'token invalid'})
  }
  if (decodedToken.role != 1){
    return response.status(401).json({ error: 'only admin users can modify this'})
  }

  const product = new Product({
    name: body.name,
    featureImg: body.featureImg,
    description: body.description,
    price: body.price,
    stock: body.stock,
    section: body.section,
    category: body.category,
    discount:body.discount,
  })

  console.log(product)

  product.featureImg.data = fs.readFileSync(featureImg.path)
  product.featureImg.contentType = featureImg.type

  const savedProduct = await product.save()
  response.json(savedProduct)
})

productsRouter.delete('/:id', async (request, response) => {
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if (!decodedToken.id){
    return response.status(401).json({ error: 'token invalid'})
  }
  if (decodedToken.role == 0){
    return response.status(401).json({ error: 'only admin users can modify this'})
  }
    await Product.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

productsRouter.put('/:id', async (request, response) => {
  const body = request.body
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if (!decodedToken.id){
    return response.status(401).json({ error: 'token invalid'})
  }
  if (decodedToken.role != 1){
    return response.status(401).json({ error: 'only admin users can modify this'})
  }

    const product = {
      name: body.name,
      featureImg: body.featureImg,
      description: body.description,
      price: body.price,
      stock: body.stock,
      section: body.section,
      category: body.category,
      discount:body.discount,
    }
    const updatedProduct = await Product.findByIdAndUpdate(request.params.id, product, { new: true, runValidators: true, context: 'query' })
    response.json(updatedProduct)
})

module.exports = productsRouter