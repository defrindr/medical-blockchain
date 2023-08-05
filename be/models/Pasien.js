"use strict";

module.exports = (sequelize, DataTypes) => {
  const Pasien = sequelize.define("Pasien", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "user_id",
    },
    noIdentity: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "no_identity",
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bloodType: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "blood_type",
    },
    birthday: {
      type: DataTypes.DATE,
      allowNull: false,
    },
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
  });

  Pasien.associate = function (models) {
    Pasien.belongsTo(models.User, { foreignKey: "id", as: "user" });
  };
  return Pasien;
};
