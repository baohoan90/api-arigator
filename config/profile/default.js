module.exports = {
    cookie: {
        secret: process.env.COOKIE_SECRET_KEY,
    },
    session: {
        secure: true
    },
    db: {
        provider: "pg",
    },
    redis: {
        url: "redis://some-redis-server:6379"
    },
    log: "info"
};