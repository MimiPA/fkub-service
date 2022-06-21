const express = require('express');
const router = express.Router();

//Import routes
const userProposalRouter = require('./userProposal');
const pmptspProposalRouter = require('./pmptspProposal');
const fkubProposalRouter = require('./fkubProposal');

//Import middleware
const middleware = require("../../middleware");
const verifyToken = middleware.verifyToken;
const pmptspAuth = middleware.pmptspAuth;
const fkubAuth = middleware.fkubAuth;

router.use('/user', verifyToken, userProposalRouter);
router.use('/pmptsp', verifyToken, pmptspAuth, pmptspProposalRouter);
router.use('/fkub', verifyToken, fkubAuth, fkubProposalRouter);

module.exports = router;