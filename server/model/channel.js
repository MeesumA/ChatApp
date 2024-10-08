const mongoose = require('mongoose');

const ChannelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  messages: [{ sender: String, messageContent: String, timestamp: { type: Date, default: Date.now } }]
});

module.exports = mongoose.model('Channel', ChannelSchema);
