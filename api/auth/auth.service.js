const _ = require('lodash')
const db = require("../../base/models");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const httpConstant = require("../../constants/http.constant");

const APIError = require("../../base/errors/api.error");
const NotFoundError = require("../../base/errors/not-found.error");
const ValidationHolder = require("../../utils/validation-holder.utils");
const AuthUtils = require('../../utils/auth.utils');

/**
 * createToken
 * @param {Object} user 
 * @returns token
 */
const createToken = (user) => {
    return jwt.sign({
        id: user.userId,
        username: user.email,
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

/**
 * login
 * @param {String} username 
 * @param {String} password 
 * @returns User and Token
 */
exports.login = async function (username, password) {
    // 1. check if user exist and password is correct
    const user = await db.models.comUserMst.findOne({ where: { email: username } });

    // 2. compare encrypted password to DB's password
    if (!user || !AuthUtils.verifyPassword(password, user.password)) {
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

/**
 * Register new user
 * @param {Object} dto 
 * @returns user + token
 */
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

/**
 * verifyToken
 * @param {Object} authorization 
 * @returns 
 */
exports.verifyToken = async (authorization) => {
    // 1) check if the token is there
    let token;
    if (authorization && authorization.startsWith("Bearer")) {
        token = authorization.split(" ")[1];
    }

    if (!token) {
        throw APIError.create(httpConstant.UN_AUTHORIZED, 'MSGE00001');
    }

    // 2) Verify token
    try {
        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET_KEY);
        if (decoded.id == null || _.isEmpty(decoded.username)) {
            throw APIError.create(httpConstant.UN_AUTHORIZED, 'MSGE00037', 'Token');
        }
        // 3) check if the user is exist (not deleted)
        const user = await db.models.comUserMst.findByPk(decoded.id);
        if (!user) {
            throw APIError.create(httpConstant.UN_AUTHORIZED, 'MSGE00017', 'user');
        }       
    } catch(error) {
        throw APIError.create(httpConstant.UN_AUTHORIZED, error.message);
    }
    
    return true;
};

// Authorization check if the user have rights to do this action
exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            throw APIError.create(httpConstant.FORBIDDEN, 'MSGE00002');
        }
        next();
    };
};