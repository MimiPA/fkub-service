const express = require('express');
const router = express.Router();
const multer = require('multer');

//Import controller
const kemenagController = require('../../controllers/kemenag');

//Get Daftar Surat Rekomendasi Kemenag
router.get('/list', kemenagController.listAllSuratRekomendasi);

//Get Daftar Surat Rekomendasi Kemenag by id
router.get('/list/detail/:id_pengajuan?', kemenagController.suratRekomendasiById);

//POST Surat Rekomendasi Kemenag
router.post('/upload', multer({ storage: multer.memoryStorage() }).single("dokumen"), kemenagController.uploadSuratRekomendasi);

module.exports = router;