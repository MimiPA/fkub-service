const express = require('express');
const router = express.Router();

//Import routes
const usersRouter = require('./users');

//Import middleware
const middleware = require("../../middleware");
const verifyToken = middleware.verifyToken;

router.use('/admin', verifyToken, usersRouter);

module.exports = router;