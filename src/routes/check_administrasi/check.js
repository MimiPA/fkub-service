const express = require('express');
const router = express.Router();

//Import controller
const checkController = require('../../controllers/check_administrasi');

//Get Surat Permohonan Rekomendasi FKUB
router.get('/', checkController.suratPermohonanRekomendasiFKUB);

module.exports = router;