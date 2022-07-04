'use strict';

module.exports = (sequelize, DataTypes) => {
  const Pengguna = sequelize.define(
    "Pengguna",
    {
      nik: {
        type: DataTypes.STRING(16),
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      role: {
        type: DataTypes.ENUM('User', 'Admin', 'PMPTSP', 'FKUB', 'Kemenag', 'Dinas Tata Ruang'),
        defaultValue: "User",
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(100),
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      is_active: {
        type: DataTypes.ENUM("Enable", "Disable"),
        defaultValue: "Disable",
        allowNull: false,
      },
      nama_depan: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      nama_belakang: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      nama_lengkap: {
        type: DataTypes.VIRTUAL,
        get() {
          const firstname = this.nama_depan;
          const lastname = this.nama_belakang;
          return `${firstname} ${lastname}`;
        },
        set(value) {
          throw new Error("Do not try to set the `fullname` value!");
        },
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
      foto: {
        type: DataTypes.TEXT,
      },
    },
    {
      tableName: "pengguna",
      timestamps: true,
    });

  Pengguna.associate = function (models) {
    Pengguna.hasMany(models.Pengajuan, {
      foreignKey: {
        name: "id_user",
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
    Pengguna.hasMany(models.Trx_access_token, {
      foreignKey: {
        name: "id_user",
        type: DataTypes.STRING,
        allowNull: false
      },
    });
    Pengguna.hasMany(models.Trx_dokumen_instansi, {
      foreignKey: {
        name: "id_user",
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  }

  return Pengguna;
};