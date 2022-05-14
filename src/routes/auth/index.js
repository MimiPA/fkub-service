const express = require('express');
const router = express.Router();

const masterController = require("../../controllers/auth");
const auth = require("../../middleware");

router.get("/", function (req, res, next) {
    res.send("Masuk");
});

//POST user register
router.post("/register", masterController.register);

//POST user login
router.post("/login", masterController.login);

//POST user logout
router.post("/logout:id?", auth.verifyToken, masterController.logout);

module.exports = router;