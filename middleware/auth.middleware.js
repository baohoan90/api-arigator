const authService = require('../api/auth/auth.service')

class Authentication {

   verify(req, resp, next) {
        authService.verifyToken(req.headers.authorization)
        .then(data => next())
        .catch(err => next(err));
    };

}

module.exports = new Authentication();