# 05 - async and await for asynchronous functions

ES7 introduced _async_ and _await_, that can be used to write asynchronous code in a way that looks synchronous. 

We simply add the keyword _async_ before any function that will have asynchronous behavior.
And then we signal with _await_ when we want the code to `wait` until an execution is done.

Is somehow cleaner than the old chaining something.then().then().catch()

For instance, the old code for fetching all notes:

  notesRouter.get('/', (request, response)=>{
    Note
      .find({}).then(notes => {response.json(notes)})
  })

Will become:

  notesRouter.get('/', async (request, response)=>{
    const notes = await Note.find({})
    response.json(notes)
  })



# Handling errors in async/await

To deal with errors, we have two options:

1- Use try/catch.  
Example:

  notesRouter.delete('/:id', async (request, response, next) => {
    try {
      await Note.findByIdAndDelete(request.params.id)
      response.status(204).end()
    } catch(exception){
      next(exception)
    }
  })  

<br>

2- Use the express-async-errors library.

We install it with:

  npm install express-async-errors

And we import it into our code with:

  require('express-async-errors')

That is all. Now we can *completely delete* the try-except part:

  notesRouter.delete('/:id', async (request, response) => {
    await Note.findByIdAndDelete(request.params.id)
    response.status(204).end()
  }) 

Notice that we also remove the `next` parameter. This is because the _express-async-errors_ library takes care of automatically pass any exceptions to the error handling middleware.   
Magic.


I made the changes, and noticed that now I cannot trigger the error for id with bad format. Weird.