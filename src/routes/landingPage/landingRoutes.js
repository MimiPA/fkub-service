const express = require('express');
const router = express.Router();

//Import Controller
const landingController = require('../../controllers/landing');

//GET Pengajuan Proposal
router.get("/list", landingController.listProposal);

//GET All Status Terkini Proposal
router.get("/pelacakan", landingController.transparansiLacak);

// //GET Status Proposal untuk Menu
// router.get("/menu", proposalController.checkStatusProposal);

// //GET Detail Pengajuan By ID
// router.get("/list/detail/:id?", proposalController.detailPengajuanById);

// //GET Detail Pengajuan with Dokumen Instansi
// router.get("/list/detailInstansi/:id?", proposalController.detailDokumenInstansi);

// //GET Detail Pengajuan with Dokumen Pemohon
// router.get("/list/detailAdministrasi/:id?", proposalController.detailDokumenPemohon);

// //GET Detail Pengajuan with Dokumen Pendukung
// router.get("/list/detailPendukung/:id?", proposalController.detailDokumenPendukung);

module.exports = router;