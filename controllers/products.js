const productsRouter = require('express').Router()
const Product = require('../models/products')
  
productsRouter.get('/', (request, response, next)=>{
  Product.find({}).then(item => {
      response.json(item)
  })
  .catch(error => next(error))
})

productsRouter.get('/:id', (request, response, next) => {
  Product
    .findById(request.params.id)
    .then(item => {
      if (item) {
        response.json(item);
      } else {
        response.status(404).json({ error: 'Product not found' });
      }
    })
    .catch(error => next(error))
});

productsRouter.post('/', (request, response, next) => {
  const body = request.body

  const product = new Product({
    name: body.name,
    featureImg: body.featureImg,
    galleryImg: body.galleryImg,
    description: body.description,
    descriptionL: body.descriptionL,
    price: body.price,
    stock: body.stock,
    category: body.category,
    discount:body.discount,
  })

  product
    .save()
    .then(savedProduct => {
      response.json(savedProduct)
    })
    .catch(
      error => next(error)
    )
})

productsRouter.delete('//:id', (request, response, next) => {
  Product.findByIdAndRemove(request.params.id)
      .then(result => {
      response.status(204).end()
      })
      .catch(error => next(error))
  })


productsRouter.put('//:id', (request, response, next) => {
  const body = request.body

  const product = {
    name: body.name,
    featureImg: body.featureImg,
    galleryImg: body.galleryImg,
    description: body.description,
    descriptionL: body.descriptionL,
    price: body.price,
    stock: body.stock,
    category: body.category,
    discount:body.discount,
  }

  Product.findByIdAndUpdate(request.params.id, product, { new: true, runValidators: true, context: 'query' })
      .then(updatedProduct => {
      response.json(updatedProduct)
      })
      .catch(error => next(error))
})

module.exports = productsRouter