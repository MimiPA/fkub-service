'use strict';

module.exports = (sequelize, DataTypes) => {
  const Pelacakan = sequelize.define(
    "Pelacakan",
    {
      id: {
        type: DataTypes.INTEGER(4),
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      kategori_pelacakan: {
        type: DataTypes.STRING(255),
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
      tableName: "pelacakan",
      timestamps: true,
    }
  );

  Pelacakan.associate = function (models) {
    Pelacakan.hasMany(models.Trx_status_lacak, {
      foreignKey: {
        name: "id_pelacakan",
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    });
  }

  return Pelacakan;
};