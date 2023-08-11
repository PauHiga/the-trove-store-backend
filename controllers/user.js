const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userRouter = require('express').Router()
const User = require('../models/userModel')

const getTokenFrom = request => {
  const authorization = request.get('Authorization')
  if (authorization && authorization.startsWith('Bearer ')){
    return authorization.replace('Bearer ', '')
  }
  return null
}

userRouter.post('/', async (request, response) => {
  const { username, password, name, email, phone, address, role } = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const newUser = new User({
    username,
    passwordHash,
    name,
    email,
    phone, 
    address, 
    role
  })

  const savedUser = await newUser.save()

  const userForToken = {
    username: savedUser.username,
    id: savedUser._id,
    role: savedUser.role,
  }

  const token = jwt.sign(userForToken, process.env.SECRET)

  response.status(201).send({ token, username: savedUser.username, role: savedUser.role})
})


userRouter.get('/', async (request, response) => {
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!decodedToken.id){
    return response.status(401).json({ error: 'token invalid'})
  }
  const user = await User.findById(decodedToken.id)
    if (user) {
      if (user.role === 0){
        response.json({token:token, username: user.username, name:user.name, address: user.address, email:user.email, phone:user.phone, role: user.role});
      }
      else {
        response.json({token:token, username: user.username, role: user.role});
      }
    } else {
        response.status(404).json({ error: 'User not found' });
    }
})

userRouter.put('/', async (request, response) => {
  const body = request.body
  console.log('request', request)
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if (!decodedToken.id){
    return response.status(401).json({ error: 'token invalid'})
  }
  const user = await User.findById(decodedToken.id)
    if (!user) {
      response.status(404).json({ error: 'User not found' });
      } 
    else {
      const userToEdit = {
        name: body.name,
        email: body.email,
        phone: body.phone,
        address: body.address,
      }
    const updatedUser = await User.findByIdAndUpdate(decodedToken.id, userToEdit, { new: true, runValidators: true, context: 'query' })
    response.json(updatedUser)
    }
})

module.exports = userRouter
