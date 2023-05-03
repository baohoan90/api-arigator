const db = require("../../../base/models");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
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
    // 1. check if user exist and password is correct
    const user = await db.models.comUserMst.findOne({ where: { email: username } });

    // 2. compare encrypted password to DB's password
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

exports.signUp = async (dto) => {

    const user = await db.models.comUserMst.create(dto);

    const token = createToken(user.id);

    user.password = undefined;

    return {
        user: user,
        token: token,
    }

};

exports.verify = async (req, res, next) => {
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
        const user = await db.models.comUserMst.findById(decode.id);
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