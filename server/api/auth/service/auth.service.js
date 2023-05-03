const db = require("../../../base/models");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const i18n = require('../../../../config/i18n.config');

const NotFoundError = require("../../../base/errors/not-found.error");

const createToken = id => {
    return jwt.sign({
            id,
        },
        process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,
        },
    );
};

exports.login = async function (username, password) {
    // 2) check if user exist and password is correct
    const user = await db.models.comUserMst.findOne({ where: { email: username } });
    
    //console.log(i18n.__n('MSGI001', 5));
    //console.log(i18n.__mf('MSGI002', { 0: 'Javascript', 1: 'Meme' } ));
    
    /*
    if (!user || !(await user.correctPassword(password, user.password))) {
        throw new NotFoundError("Email or Password is wrong");
    }
    */
    if (!user || user.password !== password) {
        throw new NotFoundError("MSGE00096");
    }

    // 3) All correct, send jwt to client
    const token = createToken(user.userId);

    // Remove the password from the output
    user.password = undefined;

    return {
        user: user,
        token: token,
    }

};

exports.signup = async (req, res, next) => {
    try {
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            passwordConfirm: req.body.passwordConfirm,
            role: req.body.role,
        });

        const token = createToken(user.id);

        user.password = undefined;

        res.status(201).json({
            status: "success",
            token,
            data: {
                user,
            },
        });
    } catch (err) {
        next(err);
    }
};

exports.protect = async (req, res, next) => {
    try {
        // 1) check if the token is there
        let token;
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {
            token = req.headers.authorization.split(" ")[1];
        }
        if (!token) {
            return next(
                new AppError(
                    401,
                    "fail",
                    "You are not logged in! Please login in to continue",
                ),
                req,
                res,
                next,
            );
        }

        // 2) Verify token
        const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

        // 3) check if the user is exist (not deleted)
        const user = await User.findById(decode.id);
        if (!user) {
            return next(
                new AppError(401, "fail", "This user is no longer exist"),
                req,
                res,
                next,
            );
        }

        req.user = user;
        next();
    } catch (err) {
        next(err);
    }
};

// Authorization check if the user have rights to do this action
exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new ForbiddenError("You are not allowed to do this action"),
                req,
                res,
                next,
            );
        }
        next();
    };
};