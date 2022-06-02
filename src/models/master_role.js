'use strict';

module.exports = (sequelize, DataTypes) => {
  const Master_role = sequelize.define(
    "Master_role",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      role: {
        type: DataTypes.STRING(100),
        unique: true,
        allowNull: false,
        defaultValue: "User",
      },
      idUser_create: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      idUser_update: {
        type: DataTypes.INTEGER,
      },
    },
    {
      tableName: "master_roles",
      timestamps: true,
    }
  );

  Master_role.associate = function (models) {
    Master_role.hasMany(models.Pengguna, {
      foreignKey: {
        name: "id_role",
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  };

  return Master_role;
}