const _ = require('lodash')
const db = require("../../../base/models");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const httpConstant = require("../../../constants/http.constant");
const NotFoundError = require("../../../base/errors/not-found.error");
const APIError = require("../../../base/errors/api.error");
const ValidationHolder = require("../../../utils/validation-holder.utils");

const createToken = (user) => {
    return jwt.sign({
        id: user.id,
        username: user.username,
        roles: user.roles
    },
        process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES_IN,
        algorithm: 'HS256',
        //        audience: config.jwt.audience,
        issuer: process.env.JWT_ISSUER
    },
    );
};

exports.login = async function (username, password) {
    // 1. check if user exist and password is correct
    const user = await db.models.comUserMst.findOne({ where: { email: username } });

    // 2. compare encrypted password to DB's password
    if (!user || user.password !== password) {
        throw new NotFoundError("MSGE00096");
    }

    // 3) All correct, send jwt to client
    const token = createToken(user);

    // Remove the password from the output
    user.password = undefined;

    return {
        user: user,
        token: token,
    }

};

exports.signUp = async (dto) => {

    const user = await db.models.comUserMst.create(dto);

    const token = createToken(user);

    user.password = undefined;
    user.token = token;
    return {
        user: user,
        token: token,
    }

};

exports.verifyToken = async (authorization) => {
    // 1) check if the token is there
    let token;
    if (authorization && authorization.startsWith("Bearer")) {
        token = authorization.split(" ")[1];
    }

    if (!token) {
        throw new APIError(httpConstant.UN_AUTHORIZED, 'MSGE00001');
    }

    // 2) Verify token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET_KEY);

    if (_.isEmpty(decoded.id) || _.isEmpty(decoded.user)) {
        throw new APIError(httpConstant.UN_AUTHORIZED, 'MSGE00037', 'Token');
    }
    
    // 3) check if the user is exist (not deleted)
    const user = await db.models.comUserMst.findOne(decoded.id);
    if (!user) {
        throw new APIError(httpConstant.UN_AUTHORIZED, 'MSGE00017', 'user');
    }
    return true;
};

// Authorization check if the user have rights to do this action
exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            throw new APIError(httpConstant.FORBIDDEN, 'MSGE00002');
        }
        next();
    };
};