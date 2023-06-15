const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/userModel')

userRouter.post('/', async (request, response) => {
  const { username, password, email, phone, address, role } = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    passwordHash,
    email,
    phone, 
    address, 
    role
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

module.exports = userRouter
