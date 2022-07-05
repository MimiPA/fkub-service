const express = require('express');
const router = express.Router();
const multer = require('multer');

//Import Controller
const pendukungController = require("../../controllers/pendukung");

//GET Detail Pengajuan
router.get("/:id?", pendukungController.detailPengajuanById);

//POST Mendukung/Menentang
router.post("/upload/:id?", pendukungController.mendukung);

//GET List All Dukungan
router.get("/list/:id?", pendukungController.listAllDukungan);

//POST Upload Foto Diri
router.post("/upload/foto_diri/:id?", multer({ storage: multer.memoryStorage() }).single("foto"), pendukungController.uploadFotoDiri);

//POST Upload Foto KTP
router.post("/upload/foto_ktp/:id?", multer({ storage: multer.memoryStorage() }).single("foto"), pendukungController.uploadFotoKTP);

//POST Upload Foto Diri
router.post("/upload/tanda_tangan/:id?", multer({ storage: multer.memoryStorage() }).single("foto"), pendukungController.uploadTandaTangan);

module.exports = router;