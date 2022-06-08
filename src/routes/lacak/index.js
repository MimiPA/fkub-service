const express = require('express');
const router = express.Router();

//Import routes
const lacakStatusRouter = require('./lacakStatus');

//Import middleware
const middleware = require("../../middleware");
const verifyToken = middleware.verifyToken;

router.use('/', verifyToken, lacakStatusRouter);

module.exports = router;