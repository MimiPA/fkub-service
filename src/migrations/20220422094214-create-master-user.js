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
      nama_depan: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      nama_belakang: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      telepon: {
        type: Sequelize.STRING(20),
        allowNull: false
      },
      alamat: {
        type: Sequelize.STRING(200),
        allowNull: false
      },
      jenis_kelamin: {
        type: Sequelize.ENUM('Perempuan', 'Laki-laki'),
        allowNull: false
      },
      agama: {
        type: Sequelize.ENUM('Kristen', 'Katolik', 'Buddha', 'Islam', 'Hindu', 'Konghucu'),
        allowNull: false
      },
      tanggal_lahir: {
        type: Sequelize.DATEONLY
      },
      foto: {
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
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('master_users');
  }
};