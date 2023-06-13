# Considerations for dividing the parts of the backend in different folders

Tasks:

- Separate the code according to the responsibility of each part.
- for the controllers: incorporate the Router object so we can actually separate the routes from the app.js file


----------------------------------------

We aim for this project structure:

├── index.js
├── app.js
├── build
│   └── ...
├── controllers
│   └── notes.js
├── models
│   └── note.js
├── package-lock.json
├── package.json
├── utils
│   ├── config.js
│   ├── logger.js
│   └── middleware.js 


I will pass the parts of the code related to each part to each file. 

The exports are made with module.exports, example:

    const info = (...params) => {
      console.log(...params)
    }

    const error = (...params) => {
      console.error(...params)
    }

    module.exports = {
      info, error
    }

And then imported with: require(), example:

const logger = require('./logger')

    const requestLogger = (request, response, next)=>{
      logger.info('Method:', request.method)
      logger.info('Path:', request.path)
      logger.info('Body:', request.body)
      logger.info('---')
      next()
    }


## why logger.js

Is a good practice to handle all the log related functions in a single file.


## why config.js

This folder will save the dotenv related code.


-------------------------------------------

# Express's Router:

The Router object is a middleware (function designed to work with request/response) that we use to define related routes in a single place. In other words, to separate the routes in their own folder.


### Usage of Router object:

First we create a new instance of the Router object (in this instruction we're importing and creating the new instance in the same line).  
We will call our new instance "notesRouter"

  const notesRouter = require('express').Router()

<br>

Then we change all the "app.something" for "notesRouter.something"

So our old 

  app.get('/api/notes', (request, response)=>{
    Note.find({}).then(notes => {
      response.json(notes)
    })
  })

Will become:

  notesRouter.get('/', (request, response) => {
    Note.find({}).then(notes => {
      response.json(notes)
    })
  })

And then we export the notesRouter object as always with module.exports

  module.exports = notesRouter

<br>

Notice something important:  
The path '/api/notes' becomes simply '/'  
This is because we will eventually call our Route middleware like this:

  app.use('/api/notes', notesRouter)