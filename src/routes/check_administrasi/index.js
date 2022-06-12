const express = require('express');
const router = express.Router();

//Import routes
const checkRouter = require('./check');

//Import middleware
const middleware = require("../../middleware");
const verifyToken = middleware.verifyToken;

router.use('/administrasi', verifyToken, checkRouter);

module.exports = router;