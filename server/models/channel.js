const mongoose = require('mongoose');

const ChannelSchema = new mongoose.Schema({
  name: String,
  group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' },
  messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }]
});

module.exports = mongoose.model('Channel', ChannelSchema);
