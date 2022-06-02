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
      id_user: {
        type: Sequelize.STRING(16),
        references: {
          model: "pengguna",
          key: "nik",
        },
        allowNull: false,
      },
      referral_code: {
        type: Sequelize.STRING(8),
        allowNull: false,
        unique: true
      },
      judul: {
        type: Sequelize.STRING(100),
        allowNull: false
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
        type: Sequelize.ENUM('Vihara', 'Pura', 'Islam', 'Gereja', 'Klenteng'),
        allowNull: false,
      },
      alamat: {
        type: Sequelize.STRING(200),
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM('Submit', 'Accepted', 'Rejected'),
        defaultValue: 'Submit'
      },
      nama_file_permohonan: {
        type: Sequelize.STRING(255),
        allowNull: false
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
    await queryInterface.dropTable('pengajuan');
  }
};