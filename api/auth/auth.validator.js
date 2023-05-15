const { check } = require('express-validator');
const { AppConstant } = require('../../constants/app.constant');

let validateRegisterUser = () => {
    return [
        check('user.username', 'username does not Empty').not().isEmpty(),
        check('user.username', 'username must be AlphaNumeric').isAlphanumeric(),
        check('user.username', 'username more than 6 digits').isLength({ min: 6 }),
        check('user.email', 'Invalid does not Empty').not().isEmpty(),
        check('user.email', 'Invalid email').isEmail(),
        check('user.birthday', 'Invalid birthday').isISO8601(AppConstant.YYYY_MM_DD),
        check('user.password', 'password more than 6 digits').isLength({ min: 6 })
    ];
}

let validateLogin = () => {
    return [
        check('email', 'Invalid does not Empty').not().isEmpty(),
        check('email', 'Invalid email').isEmail(),
        check('password', 'password more than 6 digits').isLength({ min: 6 })
    ];
}

let validator = {
    validateRegisterUser: validateRegisterUser,
    validateLogin: validateLogin
};

module.exports = { validator };