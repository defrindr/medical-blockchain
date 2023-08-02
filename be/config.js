// config.js
require("dotenv").config();

// Read database credentials from environment variables
const { DB_HOST, DB_PORT, DB_DATABASE, DB_USERNAME, DB_PASSWORD } = process.env;
module.exports = {
  jwtSecret: "your-secret-key-here",
  app_name: "Medical Health API Service",
  cwd: process.cwd(),
  db: {
    host: DB_HOST,
    port: DB_PORT,
    database: DB_DATABASE,
    username: DB_USERNAME,
    password: DB_PASSWORD,
  },
};
