const express = require('express');
const router = express.Router();

//Import controller
const usersController = require('../../controllers/users');

//Get all users
router.get('/', usersController.list_all_users);

//Get user by id
router.get('/:id?', usersController.user_byId);

//POST change status account
router.put('/:id?/status', usersController.changeStatusAccount);

module.exports = router;