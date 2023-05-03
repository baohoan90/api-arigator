const BaseError = require('./base.error');
const i18n = require('../../config/i18n.config');

/**
 * APIError
 * @author developer
 */
class APIError extends BaseError {

    constructor(code = 'APP_ERROR', statusCode = 400, messageId, ...params) {
        super({
            code: code,
            type: BaseError.type.APP_NAME,
            statusCode: statusCode,
            message: i18n.__mf(messageId, Object.assign({}, params)),
            isOperational: true
        });
    }
}

module.exports = APIError;