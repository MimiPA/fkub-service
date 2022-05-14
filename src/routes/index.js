// Import router
const express = require("express");
const router = express.Router();

// Define Routes
const authRouter = require("./auth");
const profileRouter = require("./profile");

// Get All Routes
router.use("", authRouter);
router.use("/profile", profileRouter);

module.exports = router;