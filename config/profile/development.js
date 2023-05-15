module.exports = {
    db: {
        port: "5433",
        host: "127.0.0.1",
        name: "arigator_dev",
        username: "postgres",
        password: "postgres",

    },
    port: 5001,
    log: {
        maxFiles: "1d", // The log files will be stored on local storage in 14(days)
        level: "debug",
        directory: "logs"
    }
};