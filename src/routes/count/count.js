const express = require('express');
const router = express.Router();

//Import controller
const countController = require('../../controllers/count');

//GET Jumlah Pengguna
router.get('/admin', countController.jumlahADMIN);

//GET Jumlah Pengajuan
router.get('/pmptsp', countController.jumlahPMPTSP);

//GET Jumlah untuk DTR
router.get('/dtr', countController.jumlahDTR);

//GET Jumlah untuk Kemenag
router.get('/kemenag', countController.jumlahKEMENAG);

module.exports = router;