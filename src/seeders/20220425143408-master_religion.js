'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("master_religions", [
      {
        id: 1,
        agama: "Buddha",
        tempat_ibadah: "Vihara",
        idUser_create: "1",
        idUser_update: null,
        createdAt: new Date(),
        updatedAt: null
      },
      {
        id: 2,
        agama: "Hindu",
        tempat_ibadah: "Pura",
        idUser_create: "1",
        idUser_update: null,
        createdAt: new Date(),
        updatedAt: null
      },
      {
        id: 3,
        agama: "Islam",
        tempat_ibadah: "Masjid",
        idUser_create: "1",
        idUser_update: null,
        createdAt: new Date(),
        updatedAt: null
      },
      {
        id: 4,
        agama: "Katolik",
        tempat_ibadah: "Gereja",
        idUser_create: "1",
        idUser_update: null,
        createdAt: new Date(),
        updatedAt: null
      },
      {
        id: 5,
        agama: "Konghucu",
        tempat_ibadah: "Klenteng",
        idUser_create: "1",
        idUser_update: null,
        createdAt: new Date(),
        updatedAt: null
      },
      {
        id: 6,
        agama: "Kristen",
        tempat_ibadah: "Gereja",
        idUser_create: "1",
        idUser_update: null,
        createdAt: new Date(),
        updatedAt: null
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("master_religions", null, {});
  },
};
