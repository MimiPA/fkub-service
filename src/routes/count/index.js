const express = require('express');
const router = express.Router();

//Import routes
const countRouter = require('./count');

//Import middleware
const middleware = require("../../middleware");
const verifyToken = middleware.verifyToken;

router.use('/', verifyToken, countRouter);

module.exports = router;