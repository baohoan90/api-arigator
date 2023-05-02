const authService = require('../service/auth.service');
const httpConstant = require('../../../../constants/http.constant');
const APIError = require("../../../base/errors/api.error");

/**
 * login
 * @param {String} email
 * @param {String} password
 */
exports.login = (req, res, next) => {

    const { email, password } = req.body;

    // 1) check if email and password exist
    if (!email || !password) {
        throw new APIError('emai or password', httpConstant.BAD_REQUEST, true, "Please provide email or password");
    }

    authService.login(email, password).then(data => {
        res.send(data);
    })
        .catch(error => {
            next(error)
        });
};