const mongoose = require('mongoose');

const GroupSchema = new mongoose.Schema({
  name: String,
  admin: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  channels: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Channel' }]
});

module.exports = mongoose.model('Group', GroupSchema);
