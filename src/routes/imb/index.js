const express = require('express');
const router = express.Router();

//Import routes
const dtrIMBRouter = require('./dtrIMB');

//Import middleware
const middleware = require("../../middleware");
const verifyToken = middleware.verifyToken;
const dtrAuth = middleware.dtrAuth;

router.use('/dtr', verifyToken, dtrAuth, dtrIMBRouter);

module.exports = router;