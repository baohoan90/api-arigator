module.exports = app => {
    // import the routes for '/books'
    const authRoutes = require('./server/api/auth');
    const courseRoutes = require('./server/api/course');
    const teacherRoutes = require('./server/api/teacher');
    const tutorialRoutes = require('./server/api/tutorial');
    const bookingRoutes = require('./server/api/visitors/booking');

    // or ES6 module
    // import bookRoutes from './api/books';

    // wire up to the express app
    app.use('/api/auth', authRoutes);
    app.use('/api/courses', courseRoutes);
    app.use('/api/teachers', teacherRoutes);
    app.use('/api/tutorials', tutorialRoutes);
    app.use('/api/visitors', bookingRoutes);
};