'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("master_users", [
      {
        id: 1,
        id_religion: 6,
        nik: "7371012345678910",
        nama_depan: "Paramita",
        nama_belakang: "Aditung",
        telepon: "085256993110",
        alamat: "Jl. Everywhere 30",
        rt: "003",
        rw: "003",
        kelurahan: "Melayu",
        kecamatan: "Wajo",
        jenis_kelamin: "Perempuan",
        tempat_lahir: "Makassar",
        tanggal_lahir: '2000-01-01',
        foto: "https://thumbs.dreamstime.com/z/hand-drawn-beautiful-cute-little-girl-pretty-cat-vector-illustration-144667109.jpg",
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
