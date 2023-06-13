# 02 - Middleware and its importance

MIDDLEWARE are like normal functions, but that we use for handling _request_ and _response_ objects. 

Express has a lot of pre-made middleware designed to make our life easier.

For instance, when we receive data from HTTP POST requests, that data is in the request body in JSON format expressed like this:

  {"name":"John","age":25,"email":"john@example.com"}

To access that data, we need to parse it, to obtain:

  {
    name: "John",
    age: 25,
    email: "john@example.com"
  }

Instead of manually parse the data each time we need to use a request.body, we can use one of the middleware functions provided by express:

  express.json()

This middleware automatically tries to parse all the requests with Content-Type: application/json or other related JSON types.


# Using middleware and the importance of its order

To call the middleware, we have to _use_ it with the method use() of the Express objects:

  app.use(express.json())

Notice that we need to place this middleware `ON TOP` of the code, in order to have it already up and running before any HTTP POST route, or any route that receives a JSON format in need of parsing.