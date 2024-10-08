const express = require('express');
const User = require('../models/User');
const Group = require('../models/Group');
const Channel = require('../models/Channel');
const Message = require('../models/Message');
const upload = require('../middleware/upload');

const router = express.Router();

router.post('/upload-image', (req, res) => {
    upload(req, res, (err) => {
      if (err) {
        return res.status(400).json({ error: err });
      } else {
        if (req.file == undefined) {
          return res.status(400).json({ error: 'No file selected!' });
        }
        res.json({ imagePath: `/uploads/${req.file.filename}` });
      }
    });
  });

// Fetch groups for a user
router.get('/groups/:userId', async (req, res) => {
  const user = await User.findById(req.params.userId).populate('groups');
  res.json(user.groups);
});

// Fetch channels for a group
router.get('/groups/:groupId/channels', async (req, res) => {
  const group = await Group.findById(req.params.groupId).populate('channels');
  res.json(group.channels);
});

// Fetch messages for a channel
router.get('/channels/:channelId/messages', async (req, res) => {
  const messages = await Message.find({ channel: req.params.channelId }).populate('sender');
  res.json(messages);
});

// Send a message to a channel
router.post('/channels/:channelId/messages', async (req, res) => {
  const { senderId, content, imageUrl } = req.body;
  const newMessage = new Message({
    sender: senderId,
    channel: req.params.channelId,
    content,
    imageUrl
  });
  await newMessage.save();
  res.json(newMessage);
});

module.exports = router;
