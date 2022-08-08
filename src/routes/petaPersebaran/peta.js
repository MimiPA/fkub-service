const express = require('express');
const router = express.Router();

const petaController = require("../../controllers/petaPersebaran");

//GET All Pengajuan
router.get("/listPengajuan", petaController.petaAllPengajuan);

//GET Pengajuan By ID, List Pendukung, List Penentang
router.get("/listPendukung/:id?", petaController.petaAllPendukung);

module.exports = router;