'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulInsert("master_accounts", [
      {
        id_role: 1,
        email: "fkubmksservice@gmail.com",
        password: "fkubmks1",
        idUser_create: 1,
        idUser_update: null,
        createdAt: new Date(),
        updatedAt: null
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("master_accounts", null, {});
  },
};
