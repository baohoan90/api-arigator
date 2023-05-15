module.exports = {
    db: {
        port: '4533',
        host: 'https://company_name.com/db_url',
        name: 'arigator_prod',
        username: 'postgres',
        password: 'postgres',

    },
    port: 6001,
        log: {
        maxFiles: "14d",
        level: "info",
        directory: "logs"
    }
};