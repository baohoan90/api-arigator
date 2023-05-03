const BaseError = require('./base.error');
const HttpStatusCode = require('../../constants/http.constant');

class ValidationError extends BaseError {

  constructor(errors = []) {
    super({
      code: 'BAD_REQUEST',
      type: BaseError.type.APP_NAME,
      statusCode: HttpStatusCode.BAD_REQUEST,
      message: 'Bad Request',
      isOperational: true,
      errors: errors
    });
  }
}

module.exports = ValidationError