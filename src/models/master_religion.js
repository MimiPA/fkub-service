'use strict';

module.exports = (sequelize, DataTypes) => {
  const Master_religion = sequelize.define(
    "Master_religion",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      agama: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      tempat_ibadah: {
        type: DataTypes.STRING(20),
        allowNull: false,
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
      tableName: "master_religions",
      timestamps: true,
    }
  );

  Master_religion.associate = function (models) {
    Master_religion.hasMany(models.Master_user, {
      foreignKey: {
        name: "id_religion",
        type: DataTypes.INTEGER,
        allowNull: false.valueOf,
      },
    });
    Master_religion.hasMany(models.Master_applicant, {
      foreignKey: {
        name: "id_religion",
        type: DataTypes.INTEGER,
        allowNull: false.valueOf,
      },
    });
  }
  return Master_religion;
};