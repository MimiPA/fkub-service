'use strict';

module.exports = (sequelize, DataTypes) => {
  const Trx_requirement_document = sequelize.define(
    "Trx_requirement_document",
    {
      filename: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      filetype: {
        type: DataTypes.STRING(10),
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
      tableName: "trx_requirement_documents",
      timestamps: true,
    }
  );

  Trx_requirement_document.associate = function (models) {
    Trx_requirement_document.belongsTo(models.Master_applicant, {
      foreignKey: {
        name: "id_applicant",
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    });
    Trx_requirement_document.hasOne(models.Master_account, {
      foreignKey: {
        name: "id_user",
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    })
  }
  return Trx_requirement_document;
};