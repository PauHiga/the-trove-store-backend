const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const Schema = mongoose.Schema;

const categoriesSchema = new mongoose.Schema({
    category: {
      type: String,
      required: true,
      unique: true, 
      trim:true
    }
})

categoriesSchema.plugin(uniqueValidator)

categoriesSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        if(returnedObject._id){
          returnedObject.id = returnedObject._id.toString()
          delete returnedObject._id
          delete returnedObject.__v
        }
    }
})

module.exports = mongoose.model('Category', categoriesSchema)