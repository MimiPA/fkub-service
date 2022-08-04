const express = require('express');
const router = express.Router();
const multer = require('multer');

//Import controller
const fkubController = require('../../controllers/fkub');

//Get Daftar Pengajuan Proposal oleh Pemohon
router.get('/list', fkubController.listAllPengajuan);

//Get Proposal by id
router.get('/list/detail/:id?', fkubController.pengajuanById);

//GET Detail Pengajuan with Dokumen Pemohon
router.get('/list/detailAdministrasi/:id?', fkubController.detailDokumenPemohon);

//GET Detail Pengajuan with Dokumen Instansi
router.get('/list/detailInstansi/:id?', fkubController.detailDokumenInstansi);

//GET Detail Pengajuan with Dokumen Pendukung
router.get('/list/detailPendukung/:id?', fkubController.detailDokumenPendukung);

//PUT Change Status Pendukung
router.put('/dukungan/:id?/status', fkubController.changeStatusPendukung);

//GET Detail Pengajuan with Dokumen Penentang
router.get('/list/detailPenentang/:id?', fkubController.listAllPenentang);

module.exports = router;