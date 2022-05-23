// Import router
const express = require("express");
const router = express.Router();

// Define Routes
const authRouter = require("./auth");
const profileRouter = require("./profile");
const usersRouter = require("./users");

// Get All Routes
router.use("", authRouter);
router.use("/profile", profileRouter);
router.use("/user", usersRouter);


module.exports = router;