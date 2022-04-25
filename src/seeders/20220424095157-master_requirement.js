'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("master_requirements", [
      {
        id: 1,
        kategori_berkas: "SK Panitia Pembangunan",
        idUser_create: 1,
        idUser_update: null,
        createdAt: new Date(),
        updatedAt: null
      },
      {
        id: 2,
        kategori_berkas: "Akta Jual Beli",
        idUser_create: 1,
        idUser_update: null,
        createdAt: new Date(),
        updatedAt: null
      },
      {
        id: 3,
        kategori_berkas: "Sertifikat Hak Milik",
        idUser_create: 1,
        idUser_update: null,
        createdAt: new Date(),
        updatedAt: null
      },
      {
        id: 4,
        kategori_berkas: "Surat Ukur",
        idUser_create: 1,
        idUser_update: null,
        createdAt: new Date(),
        updatedAt: null
      },
      {
        id: 5,
        kategori_berkas: "Surat IMB Lama",
        idUser_create: 1,
        idUser_update: null,
        createdAt: new Date(),
        updatedAt: null
      },
      {
        id: 6,
        kategori_berkas: "Surat IMB Baru",
        idUser_create: 1,
        idUser_update: null,
        createdAt: new Date(),
        updatedAt: null
      },
      {
        id: 7,
        kategori_berkas: "Surat Rekomendasi Kemenag",
        idUser_create: 1,
        idUser_update: null,
        createdAt: new Date(),
        updatedAt: null
      },
      {
        id: 8,
        kategori_berkas: "Surat Rekomendasi FKUB",
        idUser_create: 1,
        idUser_update: null,
        createdAt: new Date(),
        updatedAt: null
      },
      {
        id: 9,
        kategori_berkas: "Badan Hukum",
        idUser_create: 1,
        idUser_update: null,
        createdAt: new Date(),
        updatedAt: null
      },
      {
        id: 10,
        kategori_berkas: "Rencana Anggaran Biaya",
        idUser_create: 1,
        idUser_update: null,
        createdAt: new Date(),
        updatedAt: null
      },
      {
        id: 11,
        kategori_berkas: "Gambar Denah Gedung",
        idUser_create: 1,
        idUser_update: null,
        createdAt: new Date(),
        updatedAt: null
      },
      {
        id: 12,
        kategori_berkas: "Surat Pernyataan Anggota",
        idUser_create: 1,
        idUser_update: null,
        createdAt: new Date(),
        updatedAt: null
      },
      {
        id: 13,
        kategori_berkas: "Surat Pernyataan Warga",
        idUser_create: 1,
        idUser_update: null,
        createdAt: new Date(),
        updatedAt: null
      },
      {
        id: 14,
        kategori_berkas: "Kartu Tanda Penduduk Anggota",
        idUser_create: 1,
        idUser_update: null,
        createdAt: new Date(),
        updatedAt: null
      },
      {
        id: 15,
        kategori_berkas: "Kartu Tanda Penduduk Warga",
        idUser_create: 1,
        idUser_update: null,
        createdAt: new Date(),
        updatedAt: null
      },
      {
        id: 16,
        kategori_berkas: "Surat Panggilan Lapangan",
        idUser_create: 1,
        idUser_update: null,
        createdAt: new Date(),
        updatedAt: null
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("master_requirements", null, {});
  },
};
