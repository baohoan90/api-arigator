const express = require('express');
const authRoutes = express.Router();
const { validator } = require('./auth.validator')

// or ES6
// import { Router as booksRoutes } from 'express';

// Handlers
const authHandlers = require('./auth.handler');


// Retrieve all Tutorials
authRoutes.post("/login", validator.validateLogin(), authHandlers.login);

authRoutes.post("/verify",  authHandlers.verify);

// export authRoutes 
module.exports = authRoutes;

  // or ES6
  // export default authRoutes;