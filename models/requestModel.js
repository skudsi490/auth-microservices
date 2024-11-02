const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  title: String,
  description: String,
  type: String,
  urgency: String,
  requesterEmail: String,
  approverEmail: String,
  status: { type: String, default: 'Pending' },
}, { versionKey: false });

module.exports = mongoose.model('Request', requestSchema);
