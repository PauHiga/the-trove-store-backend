const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true, 
      trim:true
    },
    passwordHash: {
      type: String,
      required: true
    }, 
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    role: {
      type: Number,
      default: 0
    }
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        // the passwordHash should not be revealed
        delete returnedObject.passwordHash
      }
})

module.exports = mongoose.model('User', userSchema)