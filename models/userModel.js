const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['user', 'supervisor'], default: 'user' },
}, { versionKey: false });

module.exports = mongoose.model('User', userSchema);
