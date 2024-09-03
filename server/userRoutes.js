const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

// Create a new user
router.post('/users', UserController.createUser);

// Promote a user to Group Admin
router.patch('/users/:id/promote', UserController.promoteUser);

// Remove a user
router.delete('/users/:id', UserController.removeUser);

module.exports = router;
