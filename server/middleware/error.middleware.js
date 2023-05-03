const APIError = require('../base/errors/api.error')
const BaseError = require('../base/errors/base.error')

/**
 * ErrorHandler
 * @author author.name
 */
class ErrorHandler {

    formatError(error, overrides = {}) {
        // `Error.stack`'s `enumerable` property descriptor is `false`
        // Thus, `JSON.stringify(...)` doesn't enumerate over it.
        const stackTrace = JSON.stringify(error, ['stack'], 4) || {}
        const newError = JSON.parse(JSON.stringify(error))

        // No need to send to client
        newError.type = undefined
        newError.name = undefined
        newError.statusCode = undefined
        newError.isOperational = undefined
        delete newError.meta

        return {
            success: false,
            status: newError.statusCode,
            message: newError.message,
            details: newError.details,
            stack: stackTrace.stack,
            ...overrides,
            //path: newError.path,
            /*            
            error: {
                ...newError,
                stack: stackTrace.stack
            },
            success: false,
            ...overrides
*/
        }
    }

    formatResponse(result, override = {}) {
        return {
            data: result,
            success: true,
            ...override
        }
    }

    sendResponse(response, payload, statusCode = 200, context = {}) {
        if (payload instanceof BaseError) {
            const httpCode = payload.statusCode || 500
            return response.status(httpCode).json(formatError(payload))
        }

        if (payload instanceof Error) {
            const newError = createError(payload)
            const code = newError.statusCode || 500
            return res.status(code).json(formatError(newError))
        }

        return res.status(statusCode).json(formatResponse(payload))
    }

    async handleError(request, response, error) {
        const { analytics = {} } = error.meta || {};
        // logging for analytics
        console.log({ analytics });
    
        if (this.isTrustedError(error)) {
          const statusCode = error.statusCode || 500
          return response.status(statusCode).json(this.formatError(error))
        }
    
        if (error instanceof Error) {
          const newError = this.createError(error)
          const statusCode = newError.statusCode || 500
          return response.status(statusCode).json(this.formatError(newError))
        }
    
        const unknownError = new APIError('Unknown')
    
        return this.sendResponse(response, unknownError, error.statusCode);
    }

    /**
     * isTrustedError 
     * True if the error is mananged by our application
     * @param {Object} error 
     * @returns True/False
     */
    isTrustedError(error) {
        if (error instanceof BaseError) {
            return error.isOperational;
        }
        return false;
    }
}
module.exports = new ErrorHandler();