const express = require('express');
const bookingRoutes = express.Router();

  // or ES6
  // import { Router as booksRoutes } from 'express';

  // Handlers
  const bookingHandlers = require('./booking.handler');

  // Retrieve all Tutorials
  bookingRoutes.get("/bookings", bookingHandlers.findAll);

  //bookingRoutes.get("/bookings:id", bookingHandlers.findByBookingId);

  // export tutorialRoutes 
  module.exports = bookingRoutes;

  // or ES6
  // export default tutorialRoutes;