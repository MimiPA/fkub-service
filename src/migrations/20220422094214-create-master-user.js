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
      id_religion: {
        type: Sequelize.INTEGER,
        references: {
          model: "master_religions",
          key: "id",
        },
        allowNull: false,
      },
      nik: {
        type: Sequelize.STRING(20),
        allowNull: false
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
      rt: {
        type: Sequelize.STRING(5),
        allowNull: false
      },
      rw: {
        type: Sequelize.STRING(5),
        allowNull: false
      },
      kelurahan: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      kecamatan: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      jenis_kelamin: {
        type: Sequelize.ENUM('Perempuan', 'Laki-laki'),
        allowNull: false
      },
      tempat_lahir: {
        type: Sequelize.STRING(50),
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
        type: Sequelize.DATE,
        allowNull: true
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('master_users');
  }
};