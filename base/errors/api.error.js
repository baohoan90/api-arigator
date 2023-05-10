const BaseError = require('./base.error');
const i18n = require('../../config/i18n.config');

/**
 * APIError
 * @author developer
 */
class APIError extends BaseError {

    constructor(statusCode, message) {
        super({
            code: 'APP_ERROR',
            type: BaseError.type.APP_NAME,
            statusCode: statusCode || 500,
            message: message,
            isOperational: true
        });
    }

    static create(statusCode, message) {
        return new APIError(statusCode, message);
    }

    static create(statusCode, messageId, ...params) {
        return new APIError(statusCode, i18n.__mf(messageId, Object.assign({}, params)));
    }

}

module.exports = APIError;