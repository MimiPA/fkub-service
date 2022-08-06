'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('pengajuan', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(4)
      },
      referral_code: {
        type: Sequelize.STRING(8),
        allowNull: false,
        unique: true
      },
      jenis_pembangunan: {
        type: Sequelize.ENUM('Renovasi', 'Bangun Baru'),
        allowNull: false
      },
      nama_tempat: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      tempat_ibadah: {
        type: Sequelize.ENUM('Vihara', 'Pura', 'Masjid', 'Gereja', 'Klenteng'),
        allowNull: false,
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
      latitude: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      longitude: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      zipcode: {
        type: Sequelize.STRING(10),
        allowNull: false
      },
      surat_permohonan: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM('Pengajuan', 'Ditolak', 'Proses', 'Selesai'),
        defaultValue: "Pengajuan",
        allowNull: false
      },
      idUser_create: {
        type: Sequelize.STRING(16),
        allowNull: false
      },
      idUser_update: {
        type: Sequelize.STRING(16)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: true
      },
      id_user: {
        type: Sequelize.STRING(16),
        references: {
          model: "pengguna",
          key: "nik",
        },
        allowNull: false,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('pengajuan');
  }
};