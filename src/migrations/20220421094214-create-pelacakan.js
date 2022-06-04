'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('pelacakan', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER(4),
        unique: true,
      },
      kategori_pelacakan: {
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
    await queryInterface.dropTable('pelacakan');
  }
};