'use strict';

module.exports = (sequelize, DataTypes) => {
  const Master_applicant = sequelize.define(
    "Master_applicant",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      referral_code: {
        type: DataTypes.STRING(8),
        unique: true,
        allowNull: false,
      },
      judul: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      jenis_pembangunan: {
        type: DataTypes.ENUM('Renovasi', 'Bangun Baru'),
        allowNull: false,
      },
      nama_tempat: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      alamat: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      status: {
        allowNull: true,
        type: DataTypes.ENUM('Submit', 'Accepted', 'Rejected'),
        defaultValue: 'Submit'
      },
      nama_file_permohonan: {
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
    });
    Master_applicant.belongsTo(models.Master_religion, {
      foreignKey: {
        name: "id_religion",
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    });
  }
  return Master_applicant;
};