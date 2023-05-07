const BaseError = require('./base.error');
const i18n = require('../../config/i18n.config');

/**
 * APIError
 * @author developer
 */
class APIError extends BaseError {

    constructor(statusCode, messageId, ...params) {
        super({
            code: 'APP_ERROR',
            type: BaseError.type.APP_NAME,
            statusCode: statusCode || 500,
            message: i18n.__mf(messageId, Object.assign({}, params)),
            isOperational: true
        });
    }
}

module.exports = APIError;