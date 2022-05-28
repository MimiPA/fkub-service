const express = require('express');
const router = express.Router();
const multer = require('multer');

//Import Controller
const proposalController = require("../../controllers/proposal");

//POST Pengajuan Proposal
router.post("/", multer({ storage: multer.memoryStorage() }).single("nama_file_permohonan"), proposalController.pengajuanProposal);

module.exports = router;