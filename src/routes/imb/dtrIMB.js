const express = require('express');
const router = express.Router();
const multer = require('multer');

//Import controller
const dtrController = require('../../controllers/dtr/imb');

//Get Daftar Pengajuan
router.get('/list', dtrController.listAllPengajuan);

//Get Daftar Pengajuan by ID
router.get('/list/detail/:id?', dtrController.detailPengajuanById);

//GET Detail Pengajuan with Dokumen Pemohon
router.get('/list/detailAdministrasi/:id?', dtrController.detailDokumenPemohon);

//GET Detail Pengajuan with Dokumen Instansi
router.get('/list/detailInstansi/:id?', dtrController.detailDokumenInstansi);

//GET Detail Pengajuan with Dokumen Pendukung
router.get('/list/detailPendukung/:id?', dtrController.detailDokumenPendukung);

//GET All Surat IMB
router.get('/riwayat', dtrController.listAllSuratIMB);

//GET Surat IMB By ID
router.get('/riwayat/detail/:id_pengajuan?', dtrController.suratIMBById);

//POST Surat IMB
router.post('/upload', multer({ storage: multer.memoryStorage() }).single("dokumen"), dtrController.uploadSuratIMB);

module.exports = router;