const express = require('express');
const router = express.Router();

//Import middleware
const middleware = require("../../middleware");
const userAuth = middleware.userAuth;
const verifyToken = middleware.verifyToken;

//Import routes
const userProfileRouter = require('../../controllers/profile');


/* ---------------------- */
router.use(verifyToken, userAuth);

//Get User profile
router.get('/', userProfileRouter);

module.exports = router;