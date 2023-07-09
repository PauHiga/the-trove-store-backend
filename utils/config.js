require('dotenv').config()

const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI
const CLOUDINARY_CLOUD = process.env.CLOUDINARY_CLOUD
const CLOUDINARY_KEY = process.env.CLOUDINARY_KEY
const CLOUDINARY_SECRET = process.env.CLOUDINARY_SECRET


module.exports = {
  PORT,
  MONGODB_URI, 
  CLOUDINARY_CLOUD,
  CLOUDINARY_KEY, 
  CLOUDINARY_SECRET
}