const ValidationError = require("../base/errors/validation.error");
const i18n = require('../config/i18n.config');

/**
 * ErrorElement
 */
class ErrorElement {

    constructor(type, path, msg) {
        this.type = type;
        //this.value = value;
        this.path = path;
        this.msg = msg;
    }
}

/**
 * ValidationHolder
 */
class ValidationHolder {

    static _instance;

    constructor() {
        this.errors = [];
    }

    /**
     * addError
     * @param {String} type 
     * @param {String} path
     * @param {String} msg 
     */
    static addError(element, messageId, params) {
        const message = i18n.__mf(messageId, Object.assign({}, params));
        const errorElement = new ErrorElement('field', element, message);
        this._instance.errors.push(errorElement);
    }

    /**
     * create
     * @returns 
     */
    static create() {
        if (this._instance == null) {
            this._instance = new ValidationHolder();
        }
        return this._instance;
    }

    /**
     * True if size of errors is greater than 0
     * @returns True/False
     */
    static hasError() {
        return this._instance != null && this._instance.errors.length > 0;
    }

    /**
     * checkAndThrow
     */
    static checkAndThrow() {
        if (!this.hasError()) {
            return;
        }
        let temps = this._instance.errors;
        this._instance = null;
        throw new ValidationError(temps);
    }
}

module.exports = ValidationHolder;