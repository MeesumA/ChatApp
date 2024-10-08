const mongoose = require('mongoose');

const GroupSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  adminUsername: { type: String, required: true }, // The creator/admin of the group
  channels: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Channel' }],
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('Group', GroupSchema);
