'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulInsert("master_roles", [
      {
        role: "Admin",
        idUser_create: "1",
        idUser_update: null,
        createdAt: new Date(),
        updatedAt: null
      },
      {
        role: "User",
        idUser_create: "1",
        idUser_update: null,
        createdAt: new Date(),
        updatedAt: null
      },
      {
        role: "PMPTSP",
        idUser_create: "1",
        idUser_update: null,
        createdAt: new Date(),
        updatedAt: null
      },
      {
        role: "FKUB",
        idUser_create: "1",
        idUser_update: null,
        createdAt: new Date(),
        updatedAt: null
      },
      {
        role: "Kemenag",
        idUser_create: "1",
        idUser_update: null,
        createdAt: new Date(),
        updatedAt: null
      },
      {
        role: "Dinas Tata Ruang",
        idUser_create: "1",
        idUser_update: null,
        createdAt: new Date(),
        updatedAt: null
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("master_roles", null, {});
  },
};
