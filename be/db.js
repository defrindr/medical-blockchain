// db.js

const { Sequelize } = require("sequelize");
const config = require("./config");
// Create a new Sequelize instance
let db = config.db;

const sequelize = new Sequelize(db.database, db.username, db.password, {
  host: db.host,
  port: db.port,
  dialect: "mysql", // Change this to your database dialect (e.g., 'postgres', 'sqlite')
});

module.exports = sequelize;
