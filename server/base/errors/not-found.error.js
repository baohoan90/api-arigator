const BaseError = require('./base.error');
const HttpStatusCode = require('../../../constants/http.constant');
const i18n = require('../../../config/i18n.config');

class NotFoundError extends BaseError {

  constructor(messageId, ...params) {
    super({
      code: 'BAD_REQUEST',
      type: BaseError.type.APP_NAME,
      statusCode: HttpStatusCode.NOT_FOUND,
      message: i18n.__mf(messageId, Object.assign({}, params) ),
      isOperational: true
    });
  }
}

module.exports = NotFoundError