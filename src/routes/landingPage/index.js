const express = require('express');
const router = express.Router();

//Import routes
const landingRouter = require('./landingRoutes');

router.use('/', landingRouter);

module.exports = router;