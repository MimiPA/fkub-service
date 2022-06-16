const express = require('express');
const router = express.Router();

//Import routes
const userPendukungRouter = require('./dukungan');

//Import middleware
const middleware = require("../../middleware");
const verifyToken = middleware.verifyToken;

router.use('/user', verifyToken, userPendukungRouter);

module.exports = router;