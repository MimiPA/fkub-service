// Import router
const express = require("express");
const router = express.Router();

// Define Routes
const authRouter = require("./auth");
const profileRouter = require("./profile");
const usersRouter = require("./users");
const proposalRouter = require("./proposal");
const lacakRouter = require("./lacak");
const suratKRKRouter = require("./suratKRK");
const checkRouter = require("./check_administrasi");
const administrasiRouter = require("./administrasi");
const suratRekomenRouter = require('./suratRekomendasi');

// Get All Routes
router.use("", authRouter);
router.use("/profile", profileRouter);
router.use("/user", usersRouter);
router.use("/proposal", proposalRouter);
router.use("/lacak", lacakRouter);
router.use("/suratKRK", suratKRKRouter);
router.use("/check", checkRouter);
router.use("/administrasi", administrasiRouter);
router.use("/rekomendasi", suratRekomenRouter);

module.exports = router;