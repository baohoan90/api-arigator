const BookingInfo = require('../dto/booking-info.dto')

/**
 * findLatestNews
 * @param {Object} req 
 * @param {Object} res 
 */
exports.findAll = (req, res) => {
    const bookingInfo1 = new BookingInfo('Toi tai kham benh lan thu 1', 'Hoan Lam');
    const bookingInfo2 = new BookingInfo('Toi tai kham benh lan thu 2', 'Hoan Lam');
    const bookingList = [bookingInfo1, bookingInfo2];
    res.send(bookingList);
};