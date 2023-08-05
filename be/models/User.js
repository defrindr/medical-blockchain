"use strict";

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    emailVerifiedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "email_verified_at",
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rememberToken: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "remember_token",
    },
    blockchainAddress: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "blockchain_address",
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
    flag: {
      type: DataTypes.INTEGER,
      default: 1,
    },
  });

  User.associate = function (models) {
    // User.belongsToMany(models.Role, {
    //   through: "RoleUser",
    //   foreignKey: "userId",
    //   as: "roles",
    // });
    User.belongsToMany(models.Role, {
      through: "RoleUser",
      foreignKey: "user_id",
      as: "roles",
    });
    User.hasOne(models.Pasien, { foreignKey: "userId", as: "pasiens"});
  };
  return User;
};
