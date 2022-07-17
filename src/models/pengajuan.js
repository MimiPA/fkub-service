'use strict';

module.exports = (sequelize, DataTypes) => {
  const Pengajuan = sequelize.define(
    "Pengajuan",
    {
      id: {
        type: DataTypes.INTEGER(4),
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
      jenis_pembangunan: {
        type: DataTypes.ENUM('Renovasi', 'Bangun Baru'),
        allowNull: false,
      },
      nama_tempat: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      tempat_ibadah: {
        type: DataTypes.ENUM('Vihara', 'Pura', 'Masjid', 'Gereja', 'Klenteng'),
        allowNull: false,
      },
      alamat: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      rt: {
        type: DataTypes.STRING(5),
        allowNull: false,
      },
      rw: {
        type: DataTypes.STRING(5),
        allowNull: false,
      },
      surat_permohonan: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      status: {
        type: DataTypes.ENUM('Pengajuan', 'Ditolak', 'Proses', 'Selesai'),
        defaultValue: "Pengajuan",
        allowNull: false
      },
      idUser_create: {
        type: DataTypes.STRING(16),
        allowNull: false,
      },
      idUser_update: {
        type: DataTypes.STRING(16),
      },
    },
    {
      tableName: "pengajuan",
      timestamps: true,
    });

  Pengajuan.associate = function (models) {
    Pengajuan.belongsTo(models.Pengguna, {
      foreignKey: {
        name: "id_user",
        type: DataTypes.STRING(16),
        allowNull: false,
      },
    });
    Pengajuan.hasMany(models.Trx_dokumen_pemohon, {
      foreignKey: {
        name: "id_pengajuan",
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    });
    Pengajuan.hasMany(models.Pendukung, {
      foreignKey: {
        name: "id_pengajuan",
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    });
    Pengajuan.hasMany(models.Trx_status_lacak, {
      foreignKey: {
        name: "id_pengajuan",
        type: DataTypes.INTEGER,
        allowNull: false
      },
    });
    Pengajuan.hasMany(models.Trx_dokumen_instansi, {
      foreignKey: {
        name: "id_pengajuan",
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    });
  }
  return Pengajuan;
};