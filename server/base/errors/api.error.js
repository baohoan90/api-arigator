const BaseError = require('./base.error');
const HttpStatusCode = require('../../../constants/http.constant');

//free to extend the BaseError
class APIError extends BaseError {
    constructor(name,
        statusCode = HttpStatusCode.INTERNAL_SERVER,
        description = 'Internal server error', isOperational = true) {
        super(name, statusCode, description, isOperational);
    }
}

module.exports = APIError;