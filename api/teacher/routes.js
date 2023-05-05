const express = require('express');
const teacherRoutes = express.Router();

  // or ES6
  // import { Router as booksRoutes } from 'express';

  // Handlers
  const teacherHandlers = require('./handler/teacher.handler');


  // Create a new Tutorial
  teacherRoutes.post("/", teacherHandlers.create);
  
  // Search all Tutorials
  teacherRoutes.get("/", teacherHandlers.search);

  // export teacherRoutes 
  module.exports = teacherRoutes;

  // or ES6
  // export default booksRoutes;