'use strict';

module.exports = (sequelize, DataTypes) => {
  const Master_applicant = sequelize.define(
    "Master_applicant",
    {
      referral_code: {
        type: DataTypes.STRING(8),
        unique: true,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      placename: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      status: {
        allowNull: true,
        type: DataTypes.ENUM('Submit', 'Accepted', 'Rejected'),
        defaultValue: 'Submit'
      },
      application_filename: {
        type: DataTypes.STRING(255),
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
      tableName: "master_applicants",
      timestamps: true,
    }
  );

  Master_applicant.associate = function (models) {
    Master_applicant.belongsTo(models.Master_account, {
      foreignKey: {
        name: "id",
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    });
    Master_applicant.hasMany(models.Trx_requirement_document, {
      foreignKey: {
        name: "id_applicant",
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    })
  }
  return Master_applicant;
};