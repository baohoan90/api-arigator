const ValidationError = require("../base/errors/validation.error");

/**
 * ErrorElement
 */
class ErrorElement {

    constructor(type, field, msg) {
        this.type = type;
        this.field = field;
        this.msg = msg;
    }
}

/**
 * ValidationHolder
 */
class ValidationHolder {

    errors = [];

    /**
     * addError
     * @param {String} type 
     * @param {String} field 
     * @param {String} msg 
     */
    static addError(type, field, msg) {
        errors.add(new ErrorElement(type, field, msg));
    }

    /**
     * create
     * @returns 
     */
    static create() {
        return new ValidationHolder();
    }

    /**
     * True if size of errors is greater than 0
     * @returns True/False
     */
    static hasError() {
        return errors != null && errors.length > 0;
    }

    /**
     * checkAndThrow
     */
    static checkAndThrow() {
        if (this.hasError()) {
            let temps = errors.slice(0);
            this.clear();
            throw new ValidationError(temps);
        }
    }

    static clear() {
        errors = [];
    }
}

module.exports = ValidationHolder;