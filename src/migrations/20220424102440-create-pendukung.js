'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('pendukung', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      nik: {
        allowNull: false,
        type: Sequelize.STRING(16),
        unique: true,
      },
      nama_lengkap: {
        type: Sequelize.STRING(255),
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
      idUser_create: {
        type: Sequelize.STRING(16),
        allowNull: false
      },
      idUser_update: {
        type: Sequelize.STRING(16),
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: true
      },
      id_pengajuan: {
        type: Sequelize.INTEGER,
        references: {
          model: "pengajuan",
          key: "id",
        },
        allowNull: false,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('pendukung');
  }
};