'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('pengguna', {
      nik: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING(16),
        unique: true,
      },
      role: {
        type: Sequelize.ENUM('User', 'Admin', 'PMPTSP', 'FKUB', 'Kemenag', 'Dinas Tata Ruang'),
        defaultValue: "User",
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(100),
        unique: true,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING(200),
        allowNull: false
      },
      is_active: {
        type: Sequelize.ENUM('Enable', 'Disable'),
        defaultValue: "Disable",
        allowNull: false
      },
      nama_depan: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      nama_belakang: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      jenis_kelamin: {
        type: Sequelize.ENUM('Perempuan', 'Laki-laki'),
        allowNull: false
      },
      agama: {
        type: Sequelize.ENUM('Buddha', 'Hindu', 'Islam', 'Katolik', 'Konghucu', 'Kristen'),
        allowNull: false,
      },
      telepon: {
        type: Sequelize.STRING(20),
        allowNull: false
      },
      tempat_lahir: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      tanggal_lahir: {
        type: Sequelize.DATEONLY
      },
      alamat: {
        type: Sequelize.STRING(200),
        allowNull: false
      },
      rt: {
        type: Sequelize.STRING(5),
        allowNull: false
      },
      rw: {
        type: Sequelize.STRING(5),
        allowNull: false
      },
      kecamatan: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      kelurahan: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      foto: {
        type: Sequelize.TEXT
      },
      idUser_create: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      idUser_update: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: true
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('pengguna');
  }
};