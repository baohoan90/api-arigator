const BaseError = require('./base.error');
const HttpStatusCode = require('../../../constants/http.constant');

class NotFoundError extends BaseError {

  constructor(message = 'bad request') {
    super({
      code: 'BAD_REQUEST',
      type: BaseError.type.APP_NAME,
      statusCode: HttpStatusCode.BAD_REQUEST,
      message: message,
      isOperational: true
    });
  }
}

module.exports = NotFoundError