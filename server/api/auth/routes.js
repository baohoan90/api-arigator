const express = require('express');
const authRoutes = express.Router();
const { validate } = require('./validator/login.validator')
const { validationResult } = require('express-validator');
const httpConstant = require('../../../constants/http.constant');

// or ES6
// import { Router as booksRoutes } from 'express';

// Handlers
const authHandlers = require('./handler/auth.handler');
const ValidationError = require('../../base/errors/validation.error');

// Retrieve all Tutorials
authRoutes.post("/login", validate.validateLogin(), (req, res, next) => {

  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    throw new ValidationError('Validation Error', errors);
  }

  authHandlers.login(req, res, next);
});

// export authRoutes 
module.exports = authRoutes;

  // or ES6
  // export default authRoutes;