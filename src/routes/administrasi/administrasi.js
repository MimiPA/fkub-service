const express = require('express');
const router = express.Router();
const multer = require('multer');

//Import Controller
const administrasiController = require("../../controllers/administrasi");

//POST Surat Permohonan Rekomendasi FKUB
router.post("/suratFKUB", multer({ storage: multer.memoryStorage() }).single("dokumen"), administrasiController.uploadSuratFKUB);

//POST Surat Permohonan Rekomendasi Kemenag
router.post("/suratKemenag", multer({ storage: multer.memoryStorage() }).single("dokumen"), administrasiController.uploadSuratKemenag);

//POST SK Panitia Pembangunan
router.post("/skPanitia", multer({ storage: multer.memoryStorage() }).single("dokumen"), administrasiController.uploadSKPanitia);

//POST Akta Jual Beli
router.post("/aktaJualBeli", multer({ storage: multer.memoryStorage() }).single("dokumen"), administrasiController.uploadAktaJualBeli);

//POST Sertifikat Hak Milik
router.post("/shm", multer({ storage: multer.memoryStorage() }).single("dokumen"), administrasiController.uploadSertifikatHakMilik);

//POST Surat Ukur
router.post("/suratUkur", multer({ storage: multer.memoryStorage() }).single("dokumen"), administrasiController.uploadSuratUkur);

//POST Badan Hukum
router.post("/badanHukum", multer({ storage: multer.memoryStorage() }).single("dokumen"), administrasiController.uploadBadanHukum);

//POST Rencana Anggaran Biaya
router.post("/rab", multer({ storage: multer.memoryStorage() }).single("dokumen"), administrasiController.uploadRAB);

//POST Gambar Denah Gedung
router.post("/gambarDenah", multer({ storage: multer.memoryStorage() }).single("dokumen"), administrasiController.uploadGambarDenahGedung);

module.exports = router;