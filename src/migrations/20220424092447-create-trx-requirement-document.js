'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('trx_requirement_documents', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_applicant: {
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
        allowNull: false,
      },
      id_kategori_berkas: {
        type: Sequelize.INTEGER,
        references: {
          model: "master_requirements",
          key: "id",
        },
      },
      nama_file: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      tipe_file: {
        type: Sequelize.STRING(10),
      },
      status: {
        type: Sequelize.ENUM('Submit', 'Accepted', 'Rejected'),
        defaultValue: 'Submit'
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
    await queryInterface.dropTable('trx_requirement_documents');
  }
};