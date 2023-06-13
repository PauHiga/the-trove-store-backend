const mongoose = require('mongoose')
const Schema = mongoose.Schema;

if (process.argv.length<3) {
console.log('give password as argument')
process.exit(1)
}

const password = process.argv[2]

const url =
`mongodb+srv://pauhiga:${password}@cluster0.tz3jfik.mongodb.net/TheTroveStore?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  featureImg: {
    type: String,
    required: true
  },
  galleryImg: {
    type: [String],
    required: false
  },
  description: {
    type: String,
    required: true
  },
  descriptionL: {
    type: String,
    required: false
  },
  price: {
    type: Number,
    required: true
  },
  stock: {
    type: Schema.Types.Mixed,
    required: true
  },
  category: {
    type: [String],
    required: true
  },
  discount: {
    type: Number,
    required: true,
    default: 0
  }
})

const Product = mongoose.model('Product', productSchema)

const product = new Product({
  name: 'Blue woman dress',
  featureImg: 'img url',
  description: 'Blue woman dress',
  descriptionL: 'Beautiful Blue Summer woman dress in fresh colors',
  price: 35,
  stock: {'S': 10, 'M': 10, 'L': 10, 'XL':10},
  category: ['woman'],
  discount:0
})

// const product = new Product({
//   name: 'Floral woman dress',
//   featureImg: 'img url',
//   description: 'Summer woman dress',
//   descriptionL: 'Beautiful Floral Summer woman dress in fresh colors',
//   price: 35,
//   stock: {'S': 10, 'M': 10, 'L': 10, 'XL':10},
//   category: ['woman'],
//   discount:10
// })

product.save().then(result => {
console.log('product saved!')
mongoose.connection.close()
})

// Product.find({}).then(result => {
//   result.forEach(item => {
//   console.log(item)
//   })
//   mongoose.connection.close()
// })