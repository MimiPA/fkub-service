'use strict';

module.exports = (sequelize, DataTypes) => {
  const Master_user = sequelize.define(
    "Master_user",
    {
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
      telepon: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      alamat: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      jenis_kelamin: {
        type: DataTypes.ENUM('Perempuan', 'Laki-laki'),
        allowNull: false,
      },
      agama: {
        type: DataTypes.ENUM('Kristen', 'Katolik', 'Buddha', 'Islam', 'Hindu', 'Konghucu'),
        allowNull: false,
      },
      tanggal_lahir: {
        type: DataTypes.DATEONLY,
      },
      foto: {
        type: DataTypes.TEXT,
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
      tableName: "master_users",
      timestamps: true,
    }
  );

  Master_user.associate = function (models) {
    Master_user.belongsTo(models.Master_account, {
      foreignKey: {
        name: "id",
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
    })
  }

  return Master_user;
};