class BookingInfo {
    constructor(title, author) {
        this.title = title;
        this.author = author;
        this.bookingDate = new Date();
    }
}

module.exports = BookingInfo