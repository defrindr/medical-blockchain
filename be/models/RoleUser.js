"use strict";

module.exports = (sequelize, DataTypes) => {
  const RoleUser = sequelize.define(
    "RoleUser",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        field: "user_id",
      },
      roleId: {
        type: DataTypes.INTEGER,
        field: "role_id",
      },
      // created_at and updatedAt fields
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: "created_at",
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: "updated_at",
      },
    },
    {
      tableName: "role_user",
    }
  );

  RoleUser.associate = function (models) {
    RoleUser.belongsTo(models.User, { foreignKey: "id" });
    RoleUser.belongsTo(models.Role, { foreignKey: "id" });
  };

  return RoleUser;
};
