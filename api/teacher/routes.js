const express = require('express');
const teacherRoutes = express.Router();

// Middlewares
const authentication = require('../../middleware/auth.middleware')

// Handler
const teacherHandlers = require('./teacher.handler');

// Validation
const { validator } = require('./teacher.validator')



// chain middleware
const middlewares = [authentication.verify];

teacherRoutes.post("/", middlewares, validator.validateCreateTeacher(), teacherHandlers.create);

teacherRoutes.get("/", middlewares, teacherHandlers.search);

// export teacherRoutes 
module.exports = teacherRoutes;