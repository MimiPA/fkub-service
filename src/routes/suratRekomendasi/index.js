const express = require('express');
const router = express.Router();

//Import routes
const kemenagSuratRekomenRouter = require('./kemenagRekomen');

//Import middleware
const middleware = require("../../middleware");
const verifyToken = middleware.verifyToken;
const kemenagAuth = middleware.kemenagAuth;
//const dtrAuth = middleware.dtrAuth;

router.use('/kemenag', verifyToken, kemenagAuth, kemenagSuratRekomenRouter);
//router.use('/dtr', verifyToken, dtrAuth, dtrSuratKRKRouter);

module.exports = router;