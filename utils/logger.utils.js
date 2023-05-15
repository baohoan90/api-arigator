const _ = require('lodash')
const winston = require('winston')
const DailyRotateFile = require('winston-daily-rotate-file');
var config = require('../config');

const customLevels = {
    levels: {
        trace: 5,
        debug: 4,
        info: 3,
        warn: 2,
        error: 1,
        fatal: 0,
    },
    colors: {
        trace: 'white',
        debug: 'green',
        info: 'green',
        warn: 'yellow',
        error: 'red',
        fatal: 'red',
    },
};

const consoleFormatter = winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.splat(),
    winston.format.printf((info) => {

        const { timestamp, level, message, ...meta } = info;

        //return `${timestamp} [${level}][${meta.service}]: ${message} ${Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ''}`;
        return `${timestamp} [${level}][${meta.service}] ${message}`;
    }),
);

const fileFormatter = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.splat(),
    winston.format.printf((info) => {

        const { timestamp, level, message, ...meta } = info;

        //return `${timestamp} [${level}][${meta.service}]: ${message} ${Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ''}`;
        return `${timestamp} [${level}][${meta.service}] ${message}`;
    }),
);

/**
 * LoggerFactory
 * @author dev.name
 */
class LoggerFactory {

    static get(name) {
        // name is required
        if (_.isEmpty(name)) {
            throw new Error("Invalid argument 'name' cannot be empty")
        }

        if (winston.loggers.has(name)) {
            return winston.loggers.get(name);
        }

        const consoleTransport = new winston.transports.Console({
            format: consoleFormatter,
        });

        // const fileTransport = new winston.transports.DailyRotateFile
        const fileTransport = new DailyRotateFile({
            format: fileFormatter,
            maxFiles: config.log.maxFiles,
            level: config.log.level,
            dirname: config.log.directory,
            datePattern: 'YYYY-MM-DD',
            filename: `%DATE%-${config.log.level}.log`
        });

        //const httpTransport = new winston.transports.Http({ host: 'localhost', port: 5001});

        const logger = winston.loggers.add(name, {
            level: config.log.level,
            levels: customLevels.levels,

            defaultMeta: {
                service: name,
            },

            transports: [consoleTransport, fileTransport],
        });

        winston.addColors(customLevels.colors);

        return logger;
    }
}

module.exports = LoggerFactory;