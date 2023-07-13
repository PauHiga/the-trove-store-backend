const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ordersSchema = new mongoose.Schema({
  user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    products: [
    {
      type: String,
      required: true
    }
  ], 
    completed: {
      type: Boolean,
      required: true
    }
}, {
  timestamps: true
});


ordersSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
      }
})

module.exports = mongoose.model('Orders', ordersSchema)