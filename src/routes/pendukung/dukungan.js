const express = require('express');
const router = express.Router();
const multer = require('multer');

//Import Controller
const pendukungController = require("../../controllers/pendukung");

//GET Detail Pengajuan
router.get("/:id?", pendukungController.detailPengajuanById);

//POST Mendukung
router.post("/upload/:id?", pendukungController.mendukung);

//GET List All Dukungan
router.get("/list/:id?", pendukungController.listAllDukungan);

//GET Detail Pengajuan by Search Code
router.get("/searchCode/:referral_code?", pendukungController.searchCode);

//POST Menentang
router.post("/menentang/upload/:id?", pendukungController.menentang);

//GET List All Tentangan
router.get("/menentang/list", pendukungController.listAllPenentang);

module.exports = router;