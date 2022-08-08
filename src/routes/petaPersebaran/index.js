const express = require('express');
const router = express.Router();

//Import routes
const petaRoutes = require('./peta');

//Import middleware
const middleware = require("../../middleware");
const verifyToken = middleware.verifyToken;

router.use('/persebaran', verifyToken, petaRoutes);

module.exports = router;