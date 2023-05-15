const express = require('express');
const courseRoutes = express.Router();

  // or ES6
  // import { Router as booksRoutes } from 'express';

  // Handlers
  const courseHandlers = require('./course.handler');

  // Retrieve all Tutorials
  courseRoutes.get("/", courseHandlers.findAll);

  // export courseRoutes 
  module.exports = courseRoutes;

  // or ES6
  // export default courseRoutes;