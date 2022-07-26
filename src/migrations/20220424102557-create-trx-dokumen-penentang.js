'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('trx_dokumen_penentang', {
      id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'pendukung',
          key: 'id'
        },
        allowNull: false,
        primaryKey: true,
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
      alasan: {
        type: Sequelize.TEXT,
        allowNull: false,
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
    await queryInterface.dropTable('trx_dokumen_penentang');
  }
};