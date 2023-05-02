const express = require('express');
const tutorialRoutes = express.Router();

  // or ES6
  // import { Router as booksRoutes } from 'express';

  // Handlers
  const tutorialHandlers = require('./handler/tutorial.handler');

  // Retrieve all Tutorials
  tutorialRoutes.get("/", tutorialHandlers.findAll);

  // export tutorialRoutes 
  module.exports = tutorialRoutes;

  // or ES6
  // export default tutorialRoutes;