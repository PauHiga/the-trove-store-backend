# 03 - Error handling

# Case 1: Adding middleware for unknown endpoints

unknownEndopoint will handle any attempt to call a HTTP route that we didn't create.

    const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
    }

We call this middleware with:

    app.use(unknownEndpoint)

MAKE SURE TO CALL THIS MIDDLEWARE AFTER ALL THE ROUTES!
Because this middleware is meant to catch all the calls that weren't answered by a route. Any routes declared after the middleware call will never be executed.

--------------------------------

# Case 2: Catching errors in the routes:

I need to prepare the code for the possible errors:

- In case the product id doesn't exist. => I use an if/else
- In case the id has a format different than expected. => I use a .catch()

  app.get('/api/products/:id', (request, response, next) => {
    Product
      .findById(request.params.id)
      .then(item => {
        if (item) {
          response.json(item);
        } else {
          response.status(404).json({ error: 'Product not found' });
        }
      })
      .catch(error => next(error))
  });

The .catch's error handling will be passed to a middleware I will create.
That's why is handled with the function next().
DO NOT FORGET TO ADD next IN THE PARAMETERS along with request and response!


# Custom middleware for error handling:

This is the middleware function that will be called if there is any caught errors:

  const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
      response.status(404).json({ error: 'Product not found' })
    } 

    next(error)
  }

It prints the error in console, and in case the error's name is 'CastError' it responds with status(404).

The next() at the end is very important since it will allow the code to automatically chain another middleware if we declare it.

<br>

We put this middleware in use with use()

  app.use(errorHandler)


IS VERY IMPORTANT TO CALL THIS AFTER ALL THE ROUTES! Or else, if any route declared after the middleware call catches an error, the error won't be processed by our errorHandler middleware :(


