'use strict';

module.exports = (sequelize, DataTypes) => {
  const Pengajuan = sequelize.define(
    "Pengajuan",
    {
      id: {
        type: DataTypes.INTEGER(16),
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
      tempat_ibadah: {
        type: DataTypes.ENUM('Vihara', 'Pura', 'Islam', 'Gereja', 'Klenteng'),
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
      tableName: "pengajuan",
      timestamps: true,
    }
  );

  Pengajuan.associate = function (models) {
    Pengajuan.belongsTo(models.Pengguna, {
      foreignKey: {
        name: "nik",
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
    Pengajuan.hasMany(models.Trx_requirement_document, {
      foreignKey: {
        name: "id_applicant",
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    });
  }
  return Pengajuan;
};