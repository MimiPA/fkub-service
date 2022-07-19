const express = require('express');
const router = express.Router();

//Import controller
const lacakController = require('../../controllers/lacak');

//Get Status Terkini Di Dashboard
router.get('/now', lacakController.statusNow);

//Get Riwayat Status Di Dashboard
router.get('/riwayat', lacakController.riwayatStatus);

//GET Riwayat Lacak By Pengajuan ID
router.get('/lacakPengajuan/:id?', lacakController.lacakPengajuanById);

module.exports = router;