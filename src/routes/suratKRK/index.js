const express = require('express');
const router = express.Router();

//Import routes
const pmptspSuratKRKRouter = require('./pmptspKRK');
const dtrSuratKRKRouter = require('./dtrKRK');

//Import middleware
const middleware = require("../../middleware");
const verifyToken = middleware.verifyToken;
const pmptspAuth = middleware.pmptspAuth;
const dtrAuth = middleware.dtrAuth;

router.use('/pmptsp', verifyToken, pmptspAuth, pmptspSuratKRKRouter);
router.use('/dtr', verifyToken, dtrAuth, dtrSuratKRKRouter);

module.exports = router;