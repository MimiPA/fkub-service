'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('trx_dokumen_pemohon', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_pengajuan: {
        type: Sequelize.INTEGER,
        references: {
          model: "pengajuan",
          key: "id",
        },
        allowNull: false,
      },
      dokumen: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      kategori_dokumen: {
        type: Sequelize.ENUM('SK Panitia Pembangunan', 'Akta Jual Beli', 'Sertifikat Hak Milik', 'Surat Ukur', 'Badan Hukum', 'Rencana Anggaran Biaya', 'Gambar Denah Gedung', 'Surat Lainnya'),
        allowNull: false,
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
    await queryInterface.dropTable('trx_dokumen_pemohon');
  }
};