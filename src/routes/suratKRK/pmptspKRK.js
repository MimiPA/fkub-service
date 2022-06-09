const express = require('express');
const router = express.Router();

//Import controller
const pmptspController = require('../../controllers/pmptsp');

//Get Daftar Surat Permintaan KRK
router.get('/list', pmptspController.listSuratPermintaanKRK);

//Get Daftar Surat Permintaan KRK by id
router.get('/list/detail/:id?', pmptspController.permintaanKRKById);

module.exports = router;