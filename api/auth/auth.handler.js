const authService = require('./auth.service');
const { validationResult } = require('express-validator');

const ValidationError = require('../../base/errors/validation.error');
const ValidationHolder = require('../../utils/validation-holder.utils');

/**
 * login
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 */
exports.login = (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new ValidationError(errors.array());
    }
    /*
        ValidationHolder.create();
        ValidationHolder.addError('username', 'MSGE00012', ['username', 'min', 'max']);
        ValidationHolder.addError('password', 'MSGE00016', ['min']);
        ValidationHolder.checkAndThrow();
    */
    const { email, password } = req.body;

    authService.login(email, password)
    .then(data => {
        res.send(data);
    })
    .catch(error => next(error));
};

/**
 * signUp - Register a new user
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 */
exports.signUp = (req, res, next) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new ValidationError(errors.array());
    }
    /*
    {
        name: body.name,
        email: body.email,
        password: body.password,
        passwordConfirm: body.passwordConfirm,
        role: body.role,
    }
    */
    authService.signUp(req.body)
    .then(data => res.send(data))
    .catch(error => next(error));
};

exports.verify = (req, res, next) => {

    authService.verifyToken(req.headers.authorization)
    .then(data => res.send(data))
    .catch(error => next(error));
};