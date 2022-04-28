const express = require('express');
const router = express.Router();

const masterController = require("../../controllers/auth");
const auth = require("../../middleware");

router.get("/", function(req, res, next) {
    res.send("Masuk");
});

//Post user register
router.post("/register", masterController.register);

module.exports = router;