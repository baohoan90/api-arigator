const dbConfig = require("../../config/db.config");
const initModels = require('./init-models');

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.dbname, dbConfig.user, dbConfig.pass, {
  host: dbConfig.autoOptions.host,
  port: dbConfig.autoOptions.port,
  dialect: dbConfig.autoOptions.dialect,
  // operatorsAliases: false,

  pool: {
    max: dbConfig.autoOptions.pool.max,
    min: dbConfig.autoOptions.pool.max,
    acquire: dbConfig.autoOptions.pool.acquire,
    idle: dbConfig.autoOptions.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.models = initModels(db.sequelize);
module.exports = db;