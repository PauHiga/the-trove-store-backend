# 06 - Users

## Scope in our app

Each user will have an id (provided by Mongo), a username, a password (hashed for security), an email, a phone, an address and a role.

Normal users have role = 0 (Default)
Admin users have role = 1 (Default)

The app will have users and admin users,that are the users with potential to create and update products, and eventually will have access to the information about orders, payment, etc.


I will create a single admin by now.   
Eventually if is necessary the app can expand to have several admins and include functionality to register what Products were created by which admin.

In this first version no "forgot my password" option is incorporated yet.

-----------------------------------------------

# Creating users

The Users model will have: "username" and "passwordHash"

Instead of saving the password "123456" in the database, we save a _password hashed_ version of the password

We will use the ``bcrypt package`` for generating the password hashes.
We will save the passwords as password hashes. When we make the login logic, we will compare this password hash against the hashed version of the password the user types. They should match for a successful login

To make sure the usernames are unique: we install mongoose-unique-validator

And put all to work in App.

<br>

# Authorized users can create or modify products

I modified the routes for post, delete and put, in order to only allow changes if const admin = await Admin.findById(body.adminId) finds any Id. Aside of the fields of the product, we need to send in the body a "adminId" field with the identified user's id.
Else, the backend answers with status 401 user not authorized. 

<br>

# Adding Token authentication

To add token functionality we need to create a login controller that creates tokens.

Install library to generate JSON web tokens:

  npm install jsonwebtoken

We create the token with:
- the data, in this case the username and id that are saved in a const userForToken
- a secret string for security, saved in .env
- an expiration after which the token is invalid and the Admin has to login again

  const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: 60*60 })

# Only Admin users can create/modify products

Is only possible if the post request has a valid token attached.
We will use the Bearer scheme: is an authentication scheme that allows a client to authenticate with a server by presenting a token.

- The request has to send the word "Bearer" + whitespace + the token in the 'authorization' field of the headers. 
- The helper function "getTokenFrom" gets the content of that header, and if answers the format description, returns the token alone.
- The token is verified with jwt.verify().
- If the id matches an admin user, the code proceeds. 


