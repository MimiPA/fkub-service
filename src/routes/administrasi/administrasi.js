const express = require('express');
const router = express.Router();
const multer = require('multer');

//Import Controller
const administrasiController = require("../../controllers/administrasi");

//POST Surat Permohonan Rekomendasi FKUB
router.post("/upload/suratFKUB", multer({ storage: multer.memoryStorage() }).single("dokumen"), administrasiController.uploadSuratFKUB);

module.exports = router;