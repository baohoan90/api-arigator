module.exports = app => {
    // import the routes for '/books'
    const authRoutes = require('./api/auth');
    const courseRoutes = require('./api/course');
    const teacherRoutes = require('./api/teacher');
    const tutorialRoutes = require('./api/tutorial');
    const bookingRoutes = require('./api/visitors/booking');

    // or ES6 module
    // import bookRoutes from './api/books';

    // wire up to the express app
    app.use('/api/auth', authRoutes);
    app.use('/api/courses', courseRoutes);
    app.use('/api/teachers', teacherRoutes);
    app.use('/api/tutorials', tutorialRoutes);
    app.use('/api/visitors', bookingRoutes);
};