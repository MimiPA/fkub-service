// Import router
const express = require("express");
const router = express.Router();

// Define Routes
const authRouter = require("./auth");
const profileRouter = require("./profile");
const usersRouter = require("./users");
const proposalRouter = require("./proposal");

// Get All Routes
router.use("", authRouter);
router.use("/profile", profileRouter);
router.use("/user", usersRouter);
router.use("/proposal", proposalRouter);


module.exports = router;