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

module.exports = router;