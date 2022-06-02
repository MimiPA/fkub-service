'use strict';

module.exports = (sequelize, DataTypes) => {
  const Master_requirement = sequelize.define(
    "Master_requirement",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      kategori_berkas: {
        type: DataTypes.STRING(200),
        unique: true,
        allowNull: false
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
      tableName: "master_requirements",
      timestamps: true,
    }
  );

  Master_requirement.associate = function (models) {
    Master_requirement.hasMany(models.Trx_requirement_document, {
      foreignKey: {
        name: "id_kategori_berkas",
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    });
  }
  return Master_requirement;
};