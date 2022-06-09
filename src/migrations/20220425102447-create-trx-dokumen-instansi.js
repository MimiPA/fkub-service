'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('trx_dokumen_instansi', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      dokumen: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      kategori_dokumen: {
        type: Sequelize.ENUM('Surat Pengajuan KRK', 'KRK', 'Surat Rekomendasi Kemenag', 'Surat Survey Lapangan', 'Surat Rekomendasi FKUB', 'IMB'),
        allowNull: false,
      },
      role: {
        type: Sequelize.ENUM('Admin', 'PMPTSP', 'FKUB', 'Kemenag', 'Dinas Tata Ruang'),
        allowNull: false,
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
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('trx_dokumen_instansi');
  }
};