'use strict';

module.exports = (sequelize, DataTypes) => {
  const Pendukung = sequelize.define(
    "Pendukung",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      nik: {
        type: DataTypes.STRING(16),
        allowNull: false,
        unique: true,
      },
      nama_lengkap: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      jenis_kelamin: {
        type: DataTypes.ENUM('Perempuan', 'Laki-laki'),
        allowNull: false,
      },
      agama: {
        type: DataTypes.ENUM('Buddha', 'Hindu', 'Islam', 'Katolik', 'Konghucu', 'Kristen'),
        allowNull: false,
      },
      telepon: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      tempat_lahir: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      tanggal_lahir: {
        type: DataTypes.DATEONLY,
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
      kecamatan: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      kelurahan: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      latitude: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      longitude: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      zipcode: {
        type: DataTypes.STRING(10),
        allowNull: false
      },
      status: {
        type: DataTypes.ENUM('Submit', 'Ditolak', 'Diterima'),
        defaultValue: "Submit",
        allowNull: false
      },
      idUser_create: {
        type: DataTypes.STRING(16),
        allowNull: false,
      },
      idUser_update: {
        type: DataTypes.STRING(16),
        allowNull: true,
      },
    }, {
    tableName: "pendukung",
    timestamps: true,
  });

  Pendukung.associate = function (models) {
    Pendukung.belongsTo(models.Pengajuan, {
      foreignKey: {
        name: "id_pengajuan",
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    });
    Pendukung.hasOne(models.Trx_dokumen_pendukung, {
      foreignKey: {
        name: "id",
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    });
    Pendukung.hasOne(models.Trx_dokumen_penentang, {
      foreignKey: {
        name: "id",
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    });
    Pendukung.hasMany(models.Trx_alasan_penolakan, {
      foreignKey: {
        name: "id_pendukung",
        type: DataTypes.INTEGER,
        allowNull: false
      },
    });
  }

  return Pendukung;
};