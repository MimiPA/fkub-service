const express = require('express');
const router = express.Router();

//Import routes
const kemenagSuratRekomenRouter = require('./kemenagRekomen');
const fkubSuratRekomenRouter = require('./fkubRekomen');

//Import middleware
const middleware = require("../../middleware");
const verifyToken = middleware.verifyToken;
const kemenagAuth = middleware.kemenagAuth;
const fkubAuth = middleware.fkubAuth;

router.use('/kemenag', verifyToken, kemenagAuth, kemenagSuratRekomenRouter);
router.use('/fkub', verifyToken, fkubAuth, fkubSuratRekomenRouter);

module.exports = router;