const express = require('express');
const router = express.Router();
const multer = require('multer');

const cobaController = require("../../controllers/coba");

router.post("/", multer({ storage: multer.memoryStorage() }).single("dokumen"), cobaController);

module.exports = router;