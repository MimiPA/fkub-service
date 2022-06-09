const express = require('express');
const router = express.Router();

//Import controller
const pmptspController = require('../../controllers/pmptsp');

//Get Daftar Pengajuan Proposal oleh Pemohon
router.get('/list', pmptspController.listPengajuan);

//Get Proposal by id
router.get('/list/detail/:id?', pmptspController.pengajuanById);

module.exports = router;