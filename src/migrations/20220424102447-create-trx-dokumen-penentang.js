'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('trx_dokumen_penentang', {
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
      id_user: {
        type: Sequelize.STRING(16),
        references: {
          model: "pengguna",
          key: "nik",
        },
      },
      dokumen: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      kategori_dokumen: {
        type: Sequelize.ENUM('Surat Pernyataan Penolakan', 'Foto KTP', 'Foto Diri'),
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
    await queryInterface.dropTable('trx_dokumen_penentang');
  }
};