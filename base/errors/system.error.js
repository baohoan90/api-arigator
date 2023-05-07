const BaseError = require('./base.error');
const HttpStatusCode = require('../../constants/http.constant');
const i18n = require('../../config/i18n.config');

class SystemError extends BaseError {

  constructor(error) {
    super({
      code: 'INTERNAL_SERVER_ERROR',
      type: BaseError.type.APP_NAME,
      statusCode: HttpStatusCode.INTERNAL_SERVER,
      message: error.message,
      isOperational: true,
    });
  }
}

module.exports = SystemError