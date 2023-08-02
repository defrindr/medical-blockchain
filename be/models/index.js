const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const User = require("./User");
const Role = require("./Role");
const RoleUser = require("./RoleUser");

const models = {};

models.User = User(sequelize, DataTypes);
models.Role = Role(sequelize, DataTypes);
models.RoleUser = RoleUser(sequelize, DataTypes);

models.User.associate(models);
models.Role.associate(models);
models.RoleUser.associate(models);

module.exports = models;
