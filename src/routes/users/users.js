const express = require('express');
const router = express.Router();

//Import controller
const usersController = require('../../controllers/users');

//Get all users
router.get('/', usersController.list_all_users);

//Get user by id
router.get('/:id?', usersController.user_byId);

module.exports = router;