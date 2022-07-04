'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('trx_dokumen_pendukung', {
      id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'pendukung',
          key: 'id'
        },
        allowNull: false,
        primaryKey: true,
      },
      sumber_dukungan: {
        type: Sequelize.ENUM('Pengguna', 'Masyarakat'),
        allowNull: false,
      },
      surat_pernyataan: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      foto_ktp: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      foto_diri: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      tanda_tangan: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM('Submit', 'Ditolak', 'Diterima'),
        defaultValue: "Submit",
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
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('trx_dokumen_pendukung');
  }
};