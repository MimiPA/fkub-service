const express = require('express');
const router = express.Router();
const multer = require('multer');

//Import Controller
const proposalController = require("../../controllers/proposal");

//POST Pengajuan Proposal
router.post("/", multer({ storage: multer.memoryStorage() }).array('dokumen', 10), proposalController.pengajuanProposal);

//GET Pengajuan Proposal
router.get("/list", proposalController.listPengajuanProposal);

//GET Status Proposal untuk Menu
router.get("/menu", proposalController.checkStatusProposal);

//GET Detail Pengajuan By ID
router.get("/list/detail/:id?", proposalController.detailPengajuanById);

//GET Detail Pengajuan with Dokumen Instansi
router.get("/list/detailInstansi/:id?", proposalController.detailDokumenInstansi);

//GET Detail Pengajuan with Dokumen Pemohon
router.get("/list/detailAdministrasi/:id?", proposalController.detailDokumenPemohon);

//GET Detail Pengajuan with Dokumen Pendukung
router.get("/list/detailPendukung/:id?", proposalController.detailDokumenPendukung);

module.exports = router;