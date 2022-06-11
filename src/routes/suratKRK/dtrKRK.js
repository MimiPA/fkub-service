const express = require('express');
const router = express.Router();
const multer = require('multer');

//Import controller
const dtrController = require('../../controllers/dtr');

//Get Daftar Surat Permintaan KRK
router.get('/list', dtrController.listPermintaanKRK);

//Get Daftar Surat Permintaan KRK by id
router.get('/list/detail/:id?', dtrController.permintaanKRKById);

//GET All Surat KRK
router.get('/riwayat', dtrController.listAllSuratKRK);

//GET Surat KRK By ID
router.get('/riwayat/detail/:id_pengajuan?', dtrController.suratKRKById);

//POST Surat KRK
router.post('/upload', multer({ storage: multer.memoryStorage() }).single("dokumen"), dtrController.uploadSuratKRK);

module.exports = router;