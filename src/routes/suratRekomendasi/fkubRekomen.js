const express = require('express');
const router = express.Router();
const multer = require('multer');

//Import controller
const fkubController = require('../../controllers/fkub');

//Get Daftar Surat Rekomendasi FKUB
router.get('/riwayat', fkubController.listAllSuratRekomendasi);

//Get Daftar Surat Rekomendasi FKUB by id
router.get('/riwayat/detail/:id_pengajuan?', fkubController.suratRekomendasiById);

//POST Surat Rekomendasi FKUB
router.post('/upload', multer({ storage: multer.memoryStorage() }).single("dokumen"), fkubController.uploadSuratRekomendasi);

module.exports = router;