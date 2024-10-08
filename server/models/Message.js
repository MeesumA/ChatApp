const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  channel: { type: mongoose.Schema.Types.ObjectId, ref: 'Channel', required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  imageUrl: String // For storing image messages
});

module.exports = mongoose.model('Message', MessageSchema);
