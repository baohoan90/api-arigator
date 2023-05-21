const express = require("express");
const cors = require("cors");
const morgan = require('morgan')

const app = express();
const dotenv = require('dotenv');
const config = require('./config');
const bodyParser = require("body-parser");
const errorHandler = require('./middleware/error.middleware')

const LoggerFactory = require('./utils/logger.utils')
const logger = LoggerFactory.get('server');


dotenv.config({
	path: './config/settings.env'
});

app.use(bodyParser.json())

app.use(cors({
	origin: "http://localhost:8080"
}));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
	res.json({ message: "Welcome to arigator application." });
});

/**
 * Logging in-comming API request
 */
const morganMiddleware = morgan(
	":method :url :status :res[content-length] - :response-time ms", {
		stream: {
			// Configure Morgan to use our custom logger with the http severity
			write: (message) => logger.info("Response - " + message.trim()),
		},
	}
);

app.use(morganMiddleware);

require("./routes.js")(app);

// Handle Error
app.use(async (error, request, response, next) => {
	logger.info('An Error is thrown: ' + error);

	if (!errorHandler.isTrustedError(error)) {
		next(error);
	}
	await errorHandler.handleError(request, response, error);
});

/*
process.on('unhandledRejection', (reason, promise) => {
	throw reason;
});

process.on('uncaughtException', (error) => {
	errorHandler.handleError(error);
	if (!errorHandler.isTrustedError(error)) {
		process.exit(1);
	}
});
*/

// set port, listen for requests
const PORT = config.port || 8080;
app.listen(PORT, () => {
	logger.info(`Server is running on port ${PORT}.`);
});