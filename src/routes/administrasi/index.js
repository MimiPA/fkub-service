const express = require('express');
const router = express.Router();

//Import routes
const administrasiRouter = require('./administrasi');

//Import middleware
const middleware = require("../../middleware");
const verifyToken = middleware.verifyToken;

router.use('/', verifyToken, administrasiRouter);

module.exports = router;