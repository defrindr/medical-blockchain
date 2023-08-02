"use strict";

module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define(
    "Role",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );

  Role.associate = function (models) {
    // Role.belongsToMany(models.User, {
    //   through: "RoleUser",
    //   foreignKey: "roleId",
    //   as: "users",
    // });

    Role.belongsToMany(models.User, {
      through: "RoleUser",
      foreignKey: "role_id",
      as: "users",
    });
  };

  return Role;
};
