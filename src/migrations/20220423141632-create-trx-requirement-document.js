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
          model: "master_applicants",
          key: "id",
        },
        allowNull: false,
      },
      id_user: {
        type: Sequelize.INTEGER,
        references: {
          model: "master_accounts",
          key: "id",
        },
        allowNull: false,
      },
      filename: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      filetype: {
        type: Sequelize.STRING(10),
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
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('trx_requirement_documents');
  }
};