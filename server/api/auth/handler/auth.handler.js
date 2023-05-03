const authService = require('../service/auth.service');
const httpConstant = require('../../../../constants/http.constant');
const { validationResult } = require('express-validator');

const APIError = require("../../../base/errors/api.error");
const ValidationError = require('../../../base/errors/validation.error');
const ValidationHolder = require('../../../utils/validation-holder.utils');

/**
 * login
 * @param {String} email
 * @param {String} password
 */
exports.login = (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        throw new ValidationError(errors.array());
    }

    const { email, password } = req.body;

    ValidationHolder.create();

    // 1) Check if email and password exist
    if (!email || !password) {
        throw new APIError('email or password', httpConstant.BAD_REQUEST, true, "Please provide email or password");
    }

    authService.login(email, password).then(data => {
        res.send(data);
    }).catch(error => {
        next(error)
    });
};