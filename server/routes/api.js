const express = require('express');
const Group = require('../models/Group');
const Channel = require('../models/Channel');
const User = require('../models/User');
const Message = require('../models/Message');
const upload = require('../middleware/upload');

const router = express.Router();

// Create a group
router.post('/groups', async (req, res) => {
  const { name, adminUsername } = req.body;
  const newGroup = new Group({ name, adminUsername });
  await newGroup.save();
  res.json(newGroup);
});

// Join a group
router.post('/groups/:groupId/join', async (req, res) => {
  const group = await Group.findById(req.params.groupId);
  const user = await User.findById(req.body.userId);
  group.users.push(user._id);
  await group.save();
  res.json(group);
});

// Create a channel in a group
router.post('/groups/:groupId/channels', async (req, res) => {
  const { name } = req.body;
  const newChannel = new Channel({ name, group: req.params.groupId });
  await newChannel.save();
  res.json(newChannel);
});

// Fetch messages for a channel
router.get('/channels/:channelId/messages', async (req, res) => {
  const messages = await Message.find({ channel: req.params.channelId }).populate('sender');
  res.json(messages);
});

// Upload image (Avatar or Chat Image)
router.post('/upload-image', upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
  const imageUrl = `/uploads/${req.file.filename}`;
  res.json({ imageUrl });
});

module.exports = router;
