'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('master_applicants', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_user: {
        type: Sequelize.INTEGER,
        references: {
          model: "master_accounts",
          key: "id",
        },
        allowNull: false,
      },
      referral_code: {
        type: Sequelize.STRING(8),
        allowNull: false,
        unique: true
      },
      judul: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      nama_tempat: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      alamat: {
        type: Sequelize.STRING(200),
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM('Submit', 'Accepted', 'Rejected'),
        defaultValue: 'Submit'
      },
      nama_file_permohonan: {        
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
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('master_applicants');
  }
};