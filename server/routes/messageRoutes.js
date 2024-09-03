const express = require('express');
const router = express.Router();
const MessageController = require('../controllers/messageController');

// Send a message
router.post('/messages', MessageController.sendMessage);

// Get messages for a user
router.get('/messages/:userId', MessageController.getMessages);

module.exports = router;
