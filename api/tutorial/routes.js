const express = require('express');
const tutorialRoutes = express.Router();
const authentication = require('../../middleware/auth.middleware')

  // or ES6
  // import { Router as booksRoutes } from 'express';

  // Handlers
  const tutorialHandlers = require('./handler/tutorial.handler');

  // Retrieve all Tutorials
  tutorialRoutes.get("/", authentication.verify, tutorialHandlers.findAll);

  // export tutorialRoutes 
  module.exports = tutorialRoutes;

  // or ES6
  // export default tutorialRoutes;