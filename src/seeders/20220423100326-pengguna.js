'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("pengguna", [
      {
        nik: "7777777777777777",
        role: "Admin",
        email: "fkubmksservice@gmail.com",
        password: "$2b$10$xTBa0Oxovx2g/5zFjahfiuLBtslz0IJQn7a/BtD9c0ikfdFHW01/y",
        is_active: "Enable",
        nama_depan: "Paramita",
        nama_belakang: "Aditung",
        jenis_kelamin: "Perempuan",
        agama: "Kristen",
        telepon: "085256993110",
        tempat_lahir: "Makassar",
        tanggal_lahir: '2000-01-01',
        alamat: "Jalan Everywhere 30",
        rt: "003",
        rw: "003",
        kecamatan: "Wajo",
        kelurahan: "Melayu",
        foto: "https://thumbs.dreamstime.com/z/hand-drawn-beautiful-cute-little-girl-pretty-cat-vector-illustration-144667109.jpg",
        createdAt: new Date(),
        updatedAt: null
      },
      {
        nik: "1234567890123456",
        role: "User",
        email: "paramitaaditung@gmail.com",
        password: "$2b$10$xTBa0Oxovx2g/5zFjahfiuLBtslz0IJQn7a/BtD9c0ikfdFHW01/y",
        is_active: "Enable",
        nama_depan: "User",
        nama_belakang: "Pertama",
        jenis_kelamin: "Laki-Laki",
        agama: "Hindu",
        telepon: "089556993111",
        tempat_lahir: "Jakarta",
        tanggal_lahir: '2000-07-07',
        alamat: "Jalan Anywhere 7",
        rt: "007",
        rw: "007",
        kecamatan: "Wajo",
        kelurahan: "Melayu",
        foto: "https://thumbs.dreamstime.com/z/smart-boy-character-cartoon-illustration-looking-49704212.jpg",
        createdAt: new Date(),
        updatedAt: null
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("pengguna", null, {});
  },
};
