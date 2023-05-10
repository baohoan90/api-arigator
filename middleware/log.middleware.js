class Logger {

    logging(req, res, next) {
        console.log(req);
        next()
    }
}

module.exports = new Logger();