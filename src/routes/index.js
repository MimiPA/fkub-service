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
const pendukungRouter = require("./pendukung");
const countRouter = require('./count');
const imbRouter = require('./imb');
const landingRouter = require('./landingPage');
const petaRouter = require('./petaPersebaran');

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
router.use("/pendukung", pendukungRouter);
router.use("/count", countRouter);
router.use("/imb", imbRouter);
router.use("/landing", landingRouter);
router.use("/peta", petaRouter);

module.exports = router;