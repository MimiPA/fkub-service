const express = require('express');
const router = express.Router();

//Import routes
const userProposalRouter = require('./userProposal');
const pmptspProposalRouter = require('./pmptspProposal');

//Import middleware
const middleware = require("../../middleware");
const verifyToken = middleware.verifyToken;
const pmptspAuth = middleware.pmptspAuth;

router.use('/user', verifyToken, userProposalRouter);
router.use('/pmptsp', verifyToken, pmptspAuth, pmptspProposalRouter);

module.exports = router;