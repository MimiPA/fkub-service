const express = require('express');
const router = express.Router();

//Import controller
const lacakController = require('../../controllers/lacak');

//Get Status Terkini Di Dashboard
router.get('/now', lacakController.statusNow);

module.exports = router;