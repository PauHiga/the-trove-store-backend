const productsRouter = require('express').Router()
const Category = require('../models/categoriesModel')
const Product = require('../models/productsModel')
const Admin = require('../models/userModel')
require('express-async-errors')
const config = require('../utils/config')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const getTokenFrom = request => {
  const authorization = request.get('Authorization')
  if (authorization && authorization.startsWith('Bearer ')){
    return authorization.replace('Bearer ', '')
  }
  return null
}

cloudinary.config({
  cloud_name: config.CLOUDINARY_CLOUD,
  api_key: config.CLOUDINARY_KEY,
  api_secret: config.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'the_trove_store',
    allowed_formats: ['jpg', 'png', 'jpeg'],
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }
  });


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

productsRouter.post('/', upload.single('featureImg'), async (request, response) => {  
  const body = request.body
  console.log("body", body)
  const file = request.file;
  console.log("file", file)

  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if (!decodedToken.id){
    return response.status(401).json({ error: 'token invalid'})
  }
  if (decodedToken.role != 1){
    return response.status(401).json({ error: 'only admin users can modify this'})
  }

  const result = await cloudinary.uploader.upload(file.path, {
    folder: 'the_trove_store',
    resource_type: 'auto'
  });

  const product = new Product({
    name: body.name,
    featureImg: result.secure_url,
    description: body.description,
    price: body.price,
    stock: body.stock,
    section: body.section,
    category: body.category,
    discount:body.discount,
  })

  console.log(product)

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