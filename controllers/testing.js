const testingRouter = require('express').Router()
const Product = require('../models/productsModel')
const User = require('../models/userModel')
const Category = require('../models/categoriesModel')
const Order = require('../models/ordersModel')
const config = require('../utils/config')
var cloudinary = require('cloudinary').v2;
const logger = require('../utils/logger')

testingRouter.post('/reset', async (request, response) => {
  await Product.deleteMany({})
  await User.deleteMany({})
  await Category.deleteMany({})
  await Order.deleteMany({})

  response.status(204).end()
})

testingRouter.post('/delete-images', async (request, response) => {
  cloudinary.api.delete_resources_by_prefix(`${config.CLOUDINARY_FOLDER}/`).then(()=> {
    cloudinary.api.delete_folder(config.CLOUDINARY_FOLDER, (error, result) => {
      if (error) {
        logger.error('Error:', error);
      } else {
        logger.info('Result:', result);
      }
    });
  })
  response.status(204).end()
})


module.exports = testingRouter