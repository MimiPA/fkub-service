const express = require('express');
const router = express.Router();
const multer = require('multer');

//Import Controller
const pendukungController = require("../../controllers/pendukung");

//POST Pengajuan Proposal
//router.post("/", multer({ storage: multer.memoryStorage() }).single("surat_permohonan"), proposalController.pengajuanProposal);

//GET Search Code Pengajuan
router.get("/searchCode/:referral_code?", pendukungController.searchCode);

//POST Mendukung/Menentang
router.post("/upload/:id_pengajuan?", pendukungController.jenisDukungan);

//GET List All Dukungan
router.get("/list", pendukungController.listAllDukungan);

//POST Upload Surat Pernyataan
router.post("/upload/suratPernyataan/:id?", multer({ storage: multer.memoryStorage() }).single("surat_pernyataan"), pendukungController.uploadSuratPernyataan);

//POST Upload Foto Diri
router.post("/upload/foto_diri/:id?", multer({ storage: multer.memoryStorage() }).single("foto"), pendukungController.uploadFotoDiri);

//POST Upload Foto KTP
router.post("/upload/foto_ktp/:id?", multer({ storage: multer.memoryStorage() }).single("foto"), pendukungController.uploadFotoKTP);

//POST Upload Alasan
router.post("/upload/alasan/:id?", pendukungController.uploadAlasan);

module.exports = router;