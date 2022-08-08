const express = require('express');
const router = express.Router();

const petaController = require("../../controllers/petaPersebaran");

//GET All Pengajuan
router.get("/listPengajuan", petaController.petaAllPengajuan);

module.exports = router;