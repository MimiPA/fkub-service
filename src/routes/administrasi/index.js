const express = require('express');
const router = express.Router();

//Import routes
const administrasiRouter = require('./administrasi');
const kemenagRouter = require('./kemenagRouter');

//Import middleware
const middleware = require("../../middleware");
const verifyToken = middleware.verifyToken;
const kemenagAuth = middleware.kemenagAuth;

router.use('/upload', verifyToken, administrasiRouter);
router.use('/kemenag', verifyToken, kemenagAuth, kemenagRouter);

module.exports = router;