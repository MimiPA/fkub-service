const express = require('express');
const router = express.Router();

//Import controller
const dtrController = require('../../controllers/dtr');

//Get Daftar Surat Permintaan KRK
router.get('/list', dtrController.listPermintaanKRK);

//Get Daftar Surat Permintaan KRK by id
//router.get('/list/detail/:id?', pmptspController.permintaanKRKById);

module.exports = router;