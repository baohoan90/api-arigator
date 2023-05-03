const express = require("express");
var config = require('./config');
const bodyParser = require("body-parser");
const i18n = require("i18n");
const cors = require("cors");
const errorHandler = require('./server/middleware/error.middleware')


const app = express();

const dotenv = require('dotenv');

dotenv.config({
	path: './config/config.env'
});

app.use(bodyParser.json())

//app.use(expressValidator());
/*
app.use(i18n.init);

i18n.configure({
	defaultLocale: 'en',
	locales: ['en', 'vi'],
	directory: __dirname + '/locales',
	cookie: 'lang',
});
*/

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

//const db = require("./server/base/models");

require("./routes.js")(app);

app.use(async (error, request, response, next) => {
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
	console.log(`Server is running on port ${PORT}.`);
});