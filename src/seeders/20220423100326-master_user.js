'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulInsert("master_users", [
      {
        id: 1,
        firstname: "Paramita",
        lastname: "Aditung",
        phone: "085256993110",
        address: "Jl. Everywhere 30",
        gender: "Perempuan",
        religion: "Kristen",
        date_birth: '2000-01-01',
        photo: "https://thumbs.dreamstime.com/z/hand-drawn-beautiful-cute-little-girl-pretty-cat-vector-illustration-144667109.jpg",
        idUser_create: 1,
        idUser_update: null,
        createdAt: new Date(),
        updatedAt: null
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("master_users", null, {});
  },
};
