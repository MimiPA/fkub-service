const express = require('express');
const router = express.Router();

//Import controller
const kemenagController = require('../../controllers/kemenag');

//Get Daftar Surat Rekomendasi Kemenag
//router.get('/list', kemenagController.suratRekomendasiById);

//Get Daftar Surat Rekomendasi Kemenag by id
router.get('/list/detail/:id_pengajuan?', kemenagController.suratRekomendasiById);

module.exports = router;