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

