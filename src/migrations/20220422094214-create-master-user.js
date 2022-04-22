'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('master_users', {
      id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'master_accounts',
          key: 'id'
        },
        allowNull: false,
        primaryKey: true,
      },
      firstname: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      lastname: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      phone: {
        type: Sequelize.STRING(20),
        allowNull: false
      },
      address: {
        type: Sequelize.STRING(200),
        allowNull: false
      },
      gender: {
        type: Sequelize.ENUM('Female', 'Male'),
        allowNull: false
      },
      date_birth: {
        type: Sequelize.DATEONLY
      },
      photo: {
        type: Sequelize.TEXT
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
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('master_users');
  }
};