var config = require('../config');
const path = require('path');
const output = path.join(__dirname, "../base/models");
const options = { 
    host: config.db.host,
    port: config.db.port,
    directory: output, 
    caseFile: 'k', 
    caseModel: 'c', 
    caseProp: 'c', 
    //lang: 'ts', 
    useDefine: false, 
    singularize: true, 
    spaces: true, 
    indentation: 2,
    additional: {
      timestamps: false
  },
  pool: {
    max: 5, // maximum number of connection in pool
    min: 0, // minimum number of connection in pool
    acquire: 30000, // maximum time, in milliseconds, that pool will try to get connection before throwing error
    idle: 10000 // maximum time, in milliseconds, that a connection can be idle before being released
  }
};

/**
 *  c = camelCase
    l = lower_case
    o = original (default)
    p = PascalCase
    u = UPPER_CASE
    k = kebab-case
 * 
 */
// Edit the configuration below for your database dialect
/**
// sqlite
const storage = path.join(__dirname, "./northwind.sqlite");
const sqlite = {
  dbname: 'northwind',
  user: '',
  pass: '',
  options: { dialect: 'sqlite', storage: storage },
  autoOptions: { dialect: 'sqlite', storage: storage, ...options }
};
*/

// mssql
/** 
const mssql = {
  dbname: 'northwind',
  user: 'mssql',
  pass: 'mssql',
  options: { dialect: 'mssql' },
  autoOptions: { dialect: 'mssql', ...options }
};
*/

/**
// mysql
const mysql = {
  dbname: 'northwind',
  user: 'mysql',
  pass: 'mysql',
  options: { dialect: 'mysql' },
  autoOptions: { dialect: 'mysql', ...options }
};
*/

// postgres
const postgres = {
  dbname: config.db.name,
  user: config.db.username,
  pass: config.db.password,
  options: { dialect: 'postgres' },
  autoOptions: { dialect: 'postgres', ...options }
};

// Change to export appropriate config for your database
module.exports = postgres;