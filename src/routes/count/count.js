const express = require('express');
const router = express.Router();

//Import controller
const countController = require('../../controllers/count');

//GET Jumlah Admin
router.get('/admin', countController.jumlahADMIN);

//GET Jumlah PMPTSP
router.get('/pmptsp', countController.jumlahPMPTSP);

//GET Jumlah untuk DTR
router.get('/dtr', countController.jumlahDTR);

//GET Jumlah untuk Kemenag
router.get('/kemenag', countController.jumlahKEMENAG);

//GET Jumlah untuk FKUB
router.get('/fkub', countController.jumlahFKUB);

//GET Jumlah Pendukung Pengguna
router.get('/pengguna/:id?', countController.jumlahPendukungPengguna);

//GET Jumlah Pendukung Masyarakat
router.get('/masyarakat/:id?', countController.jumlahPendukungMasyarakat);

module.exports = router;