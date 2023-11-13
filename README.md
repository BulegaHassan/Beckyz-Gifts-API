## Gifts and More API
- API for an ecommerce site
- Its deployed on render
- CI/CD with Github Actions, deploys and releases tag on succes
#### Setup
- Install packages
```bash
   npm install
```
- Run the dev server
```bash 
   npm run dev
```
- For linting,fixing linting and test coverage, refer to scripts in the package.json file
#### Postman docs
- [postman docs](https://documenter.getpostman.com/view/20917716/2s9YXk51wd)
#### Database Connection

1. Import connect.js
2. Invoke in start()
3. Setup .env in the root
4. Add MONGO_URI with correct value

#### Routers

- auth
- gifts
- users

#### Middleware

- authentication
- error-handler for Validation Errors, Duplicate ,Cast Error and other errors

#### File uploading
- [express-fileupload](https://www.npmjs.com/package/express-fileupload)
- [Cloudinary](https://cloudinary.com/), [cloudinary-npm](https://www.npmjs.com/package/cloudinary)

#### User Model
**Extra Tasks done in the model**
- Password hashing
- Token creation
- Comparing password with bcrypt
- Default role is user


#### Register User

- Validate - name, email, password - with Mongoose
- Hash Password (with bcryptjs)
- Save User
- Generate Token
- Send Response with Token

#### Login User

- Validate - email, password - in controller
- If email or password is missing, throw BadRequestError
- Find User
- Compare Passwords
- If no user or password does not match, throw UnauthenticatedError
- If correct, generate Token
- Send Response with Token

#### Security

- helmet
- cors
- xss-clean
- express-rate-limit


