const express = require('express');
const router = express.Router();
const multer = require('multer');

//Import controller
const pmptspController = require('../../controllers/pmptsp');

//Get Daftar Pengajuan Proposal oleh Pemohon
router.get('/list', pmptspController.listPengajuan);

//Get Proposal by id
router.get('/list/detail/:id?', pmptspController.pengajuanById);

//POST Change Status Proposal
router.post('/list/detail/:id?/status', multer({ storage: multer.memoryStorage() }).single("dokumen"), pmptspController.changeStatusPengajuan);

module.exports = router;