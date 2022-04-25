'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('trx_similaritys', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_requirement_document: {
        type: Sequelize.INTEGER,
        references: {
          model: "trx_requirement_documents",
          key: "id",
        },
        allowNull: false,
      },
      ttd_ktp: {
        type: Sequelize.STRING(255),
      },
      kesamaan: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('trx_similaritys');
  }
};