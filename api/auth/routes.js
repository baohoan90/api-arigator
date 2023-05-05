const express = require('express');
const authRoutes = express.Router();
const { validate } = require('./validator/auth.validator')

// or ES6
// import { Router as booksRoutes } from 'express';

// Handlers
const authHandlers = require('./handler/auth.handler');


// Retrieve all Tutorials
authRoutes.post("/login", validate.validateLogin(), authHandlers.login);

// export authRoutes 
module.exports = authRoutes;

  // or ES6
  // export default authRoutes;