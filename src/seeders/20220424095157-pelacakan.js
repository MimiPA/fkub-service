'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("pelacakan", [
      {
        id: 1,
        kategori_pelacakan: "Pengajuan Surat Permohonan Pendirian Rumah Ibadah",
        idUser_create: 1,
        idUser_update: null,
        createdAt: new Date(),
        updatedAt: null
      },
      {
        id: 2,
        kategori_pelacakan: "PMPTSP menyampaikan ke Dinas Tata Ruang untuk mendapatkan KRK",
        idUser_create: 1,
        idUser_update: null,
        createdAt: new Date(),
        updatedAt: null
      },
      {
        id: 3,
        kategori_pelacakan: "Dinas Tata Ruang memberikan KRK",
        idUser_create: 1,
        idUser_update: null,
        createdAt: new Date(),
        updatedAt: null
      },
      {
        id: 4,
        kategori_pelacakan: "Pengajuan permohonan Rekomendasi Tertulis ke Kementrian Agama",
        idUser_create: 1,
        idUser_update: null,
        createdAt: new Date(),
        updatedAt: null
      },
      {
        id: 5,
        kategori_pelacakan: "Verifikasi Legalitas Ajaran dan Susunan Kepanitiaan",
        idUser_create: 1,
        idUser_update: null,
        createdAt: new Date(),
        updatedAt: null
      },
      {
        id: 6,
        kategori_pelacakan: "Penerbitan Rekomendasi Tertulis Kementrian Agama",
        idUser_create: 1,
        idUser_update: null,
        createdAt: new Date(),
        updatedAt: null
      },
      {
        id: 7,
        kategori_pelacakan: "Pengajuan permohonan Rekomendasi Tertulis ke FKUB",
        idUser_create: 1,
        idUser_update: null,
        createdAt: new Date(),
        updatedAt: null
      },
      {
        id: 8,
        kategori_pelacakan: "Melampirkan Berkas Administrasi Pengajuan",
        idUser_create: 1,
        idUser_update: null,
        createdAt: new Date(),
        updatedAt: null
      },
      {
        id: 9,
        kategori_pelacakan: "Mengumpulkan Berkas Pendukung",
        idUser_create: 1,
        idUser_update: null,
        createdAt: new Date(),
        updatedAt: null
      },
      {
        id: 10,
        kategori_pelacakan: "Penelitian Berkas Administrasi oleh Komisi Pendirian Rumah Ibadah",
        idUser_create: 1,
        idUser_update: null,
        createdAt: new Date(),
        updatedAt: null
      },
      {
        id: 11,
        kategori_pelacakan: "Rapat Tim Komisi atas Kelengkapan Berkas dan Peninjauan Lokasi",
        idUser_create: 1,
        idUser_update: null,
        createdAt: new Date(),
        updatedAt: null
      },
      {
        id: 12,
        kategori_pelacakan: "Survey Lapangan oleh Tim FKUB bersama instansi terkait",
        idUser_create: 1,
        idUser_update: null,
        createdAt: new Date(),
        updatedAt: null
      },
      {
        id: 13,
        kategori_pelacakan: "Pemasangan Pengumuman Pendirian Rumah Ibadah",
        idUser_create: 1,
        idUser_update: null,
        createdAt: new Date(),
        updatedAt: null
      },
      {
        id: 14,
        kategori_pelacakan: "Rapat Pleno",
        idUser_create: 1,
        idUser_update: null,
        createdAt: new Date(),
        updatedAt: null
      },
      {
        id: 15,
        kategori_pelacakan: "Penerbitan Rekomendasi Tertulis FKUB",
        idUser_create: 1,
        idUser_update: null,
        createdAt: new Date(),
        updatedAt: null
      },
      {
        id: 16,
        kategori_pelacakan: "Penerbitan IMB / PBG",
        idUser_create: 1,
        idUser_update: null,
        createdAt: new Date(),
        updatedAt: null
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("pelacakan", null, {});
  },
};
