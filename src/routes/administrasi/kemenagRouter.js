const express = require('express');
const router = express.Router();
const multer = require('multer');

//Import Controller
const kemenagController = require("../../controllers/kemenag");

//GET Surat Permohonan ke Kemenag
router.get("/list", kemenagController.listSuratPermohonan);

//Get Surat Permohonan ke Kemenag By Id
router.get('/list/detail/:id?', kemenagController.suratPermohonanById);

module.exports = router;