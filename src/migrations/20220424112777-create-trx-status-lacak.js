'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('trx_status_lacak', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
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
      id_pelacakan: {
        type: Sequelize.INTEGER,
        references: {
          model: "pelacakan",
          key: "id",
        },
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('trx_status_lacak');
  }
};