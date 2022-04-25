'use strict';

module.exports = (sequelize, DataTypes) => {
  const Trx_similarity = sequelize.define(
    "Trx_similarity",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      ttd_ktp: {
        type: DataTypes.STRING(255),
      },
      kesamaan: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
    },
    {
      tableName: "trx_similaritys",
      timestamps: true,
    }
  );

  Trx_similarity.associate = function (models) {
    Trx_similarity.belongsTo(models.Trx_requirement_document, {
      foreignKey: {
        name: "id_requirement_document",
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    })
  }
  return Trx_similarity;
};