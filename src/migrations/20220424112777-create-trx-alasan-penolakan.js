'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('trx_alasan_penolakan', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
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
      id_pendukung: {
        type: Sequelize.INTEGER,
        references: {
          model: "pendukung",
          key: "id",
        },
        allowNull: false,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('trx_alasan_penolakan');
  }
};