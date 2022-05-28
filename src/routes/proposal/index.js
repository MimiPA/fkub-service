const express = require('express');
const router = express.Router();

//Import routes
const userProposalRouter = require('./userProposal');

//Import middleware
const middleware = require("../../middleware");
const verifyToken = middleware.verifyToken;

router.use('/user', verifyToken, userProposalRouter);

module.exports = router;