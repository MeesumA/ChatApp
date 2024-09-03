const Message = require('../models/Message'); // Ensure this path matches where you place the Message model

// Send a message
exports.sendMessage = async (req, res) => {
  try {
    const message = new Message(req.body);
    await message.save();
    res.status(201).json(message);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get messages for a user
exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find({ to: req.params.userId });
    res.status(200).json(messages);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
