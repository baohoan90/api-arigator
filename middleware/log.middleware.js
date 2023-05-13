class Logger {

    logging(req, res, next) {
        var logCnt = 0
        console.log('logCnt: ' + (logCnt++));
        console.log('Request Logger: ' + req.url);
        console.log('Response Logger: ' + res);
        next()
    }
}

module.exports = new Logger();