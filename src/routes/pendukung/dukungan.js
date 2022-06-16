const express = require('express');
const router = express.Router();
const multer = require('multer');

//Import Controller
const pendukungController = require("../../controllers/pendukung");

//POST Pengajuan Proposal
//router.post("/", multer({ storage: multer.memoryStorage() }).single("surat_permohonan"), proposalController.pengajuanProposal);

//POST Search Code Pengajuan
router.get("/searchCode/:referral_code?", pendukungController.searchCode);

module.exports = router;