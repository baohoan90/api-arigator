const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const errorHandler = require('./server/middleware/error.middleware')

const app = express();

const dotenv = require('dotenv');
dotenv.config({
	path: './config/config.env'
});

var corsOptions = {
	origin: "http://localhost:8080"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
	res.json({ message: "Welcome to arigator application." });
});

const db = require("./server/base/models");

/**
db.sequelize.sync()
	.then(() => {
		console.log("synced db");
	}).catch((err) => {
		console.log('Failed to sync db: ' + err.message);
	});
*/
// In development, you may need to drop existing tables and re-sync database. Just use force: true as following code:
/**
db.sequelize.sync({ force: true }).then(() => {
	console.log("Drop and re-sync db.");
});
 */

require("./routes.js")(app);

app.use(async (error, request, response, next) => {
	if (!errorHandler.isTrustedError(error)) {
		next(error);
	}
	await errorHandler.handleError(request, response, error);
});


// get the unhandled rejection and throw it to another fallback handler we already have.
process.on('unhandledRejection', (reason, promise) => {
	throw reason;
});

process.on('uncaughtException', (error) => {
	errorHandler.handleError(error);
	if (!errorHandler.isTrustedError(error)) {
		process.exit(1);
	}
});


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});