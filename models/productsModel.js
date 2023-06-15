const mongoose = require('mongoose')
const Schema = mongoose.Schema;

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
      required: false
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

productSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Product', productSchema)