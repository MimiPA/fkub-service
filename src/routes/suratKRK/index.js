const express = require('express');
const router = express.Router();

//Import routes
const pmptspSuratKRKRouter = require('./pmptspKRK');

//Import middleware
const middleware = require("../../middleware");
const verifyToken = middleware.verifyToken;
const pmptspAuth = middleware.pmptspAuth;

router.use('/pmptsp', verifyToken, pmptspAuth, pmptspSuratKRKRouter);

module.exports = router;